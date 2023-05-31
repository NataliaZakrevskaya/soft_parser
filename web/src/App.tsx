import React, { createContext, useEffect, useState } from 'react'
import './static/css/global.scss'
import { useWindowSize } from "@utils/hooks/useWindowSize";
import Pc from "./components/Versions/PC/PC";
import { Helmet } from "react-helmet";
import Mobile from "./components/Versions/Mobile/Mobile";
import { Town, UserResponse } from "@api/user/types";
import { chosenCityInitial, userInitial } from "@mocks/index";
import { userApi } from "@api/user/user-api";
import { statisticsApi } from "@api/statistics/statistics-api";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addKeyByArticleRequest, Article } from "@api/statistics/types";
import {
  ChosenCityContextType,
  LoadingContextType,
  PeriodContextType,
  TablesContextType,
  UserContextType
} from "./types";
import Loading from "@components/Common/Loading/Loading";
import styles from "@components/Common/Modal/AddArticle/AddArticle.module.scss";

export const ChosenCityContext = createContext<null | ChosenCityContextType>(null);
export const UserContext = createContext<null | UserContextType>(null);
export const TablesContext = createContext<null | TablesContextType>(null);
export const PeriodContext = createContext<null | PeriodContextType>(null);
export const LoadingContext = createContext<null | LoadingContextType>(null);
export const App: React.FC = () => {

  const [isMobile, setIsMobile] = useState(false)
  const [fullVersion, setFullVersion] = useState(false)
  const [chosenCity, setChosenCity] = useState<Town>(chosenCityInitial)
  const [user, setUser] = useState<UserResponse>(userInitial)
  const [tablesData, setTablesData] = useState<Article[]>([])
  const [chosenPeriod, setChosenPeriod] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { width } = useWindowSize()
  const changeVersion = () => setFullVersion(!fullVersion)
  const chooseCity = (city: Town) => setChosenCity(city)
  const setNewTableData = (data: Article[]) => setTablesData(data)
  const addUser = (user: UserResponse) => setUser(user)
  const addKeyByArticle = async (data: addKeyByArticleRequest) => {
    await statisticsApi.addKeyByArticle(data)
      .then(res => {
        console.log('res', res)
        //@ts-ignore
        if (res.errors?.length > 0) {
          //@ts-ignore
          toast(res.errors[0].message, {
            type: 'error',
            className: styles.toastMessage
          })
        }
      })
    const dataUser = {
      userId: user._id,
      city: chosenCity._id,
      periods: chosenPeriod
    }
    await statisticsApi.findByCity(dataUser).then(res => setTablesData(res.data))

  }
  const addKey = async (newKeyValue: string, article: Article) => {
    setLoading(true)

    const data = {
      article: article.article,
      cityId: article.city_id,
      userId: user._id,
      keys: [newKeyValue.trim()]
    }
    addKeyByArticle(data)

    const dataUser = {
      userId: user._id,
      city: chosenCity._id,
      periods: chosenPeriod
    }
    await statisticsApi.findByCity(dataUser)
      .then(res => setTablesData(res.data))
      .finally(() => setLoading(false))
  }
  const deleteKey = async (keyId: string, article: Article) => {
    setLoading(true)
    const data = {
      article: article.article,
      cityId: article.city_id,
      userId: user._id,
      keyId
    }
    await statisticsApi.removeKey(data)
    const dataUser = {
      userId: user._id,
      city: chosenCity._id,
      periods: chosenPeriod
    }
    await statisticsApi.findByCity(dataUser)
      .then(res => setTablesData(res.data))
      .finally(() => setLoading(false))
  }
  const setPeriod = (data: string[]) => setChosenPeriod(data)
  const setLoadingStatus = (status: boolean) => setLoading(status)

  useEffect(() => {
    width > 639 ? setIsMobile(false) : setIsMobile(true)
  }, [width])
  useEffect(() => {
    userApi.fetchUser()
      .then(res => setUser(res.data))
  }, [])
  useEffect(() => {
    if (user._id && chosenCity._id && chosenPeriod.length > 0) {
      setLoading(true)
      const data = {
        userId: user._id,
        city: chosenCity._id,
        periods: chosenPeriod
      }
      statisticsApi.findByCity(data)
        .then(res => setTablesData(res.data))
        .finally(() => setLoading(false))
    }

  }, [user, chosenCity, chosenPeriod])
  useEffect(() => {
    let token = localStorage.getItem('sellershub-token')
    if (token === null) localStorage.setItem('sellershub-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzYxLCJpYXQiOjE2ODU0NTEwODgsImV4cCI6MTY4ODA0MzA4OH0.zTrdYTSTaUJmo6SDreykwaLuvwtOzjCrbhaiXaTp0YU')
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        addUser
      }}>
      <ChosenCityContext.Provider
        value={{
          chosenCity,
          chooseCity
        }}
      >
        <TablesContext.Provider
          value={{
            tablesData,
            addKey,
            deleteKey,
            setNewTableData
          }}>
          <PeriodContext.Provider
            value={{
              chosenPeriod,
              setPeriod
            }}>
            <LoadingContext.Provider
              value={{
                loading,
                setLoadingStatus
              }}>

              <div className="appContainer">
                <ToastContainer />
                <Loading active={loading} />
                <Helmet>
                  <meta name="viewport"
                    content={fullVersion ? "width=device-1920, initial-scale=0.25, min-scale=0.2, max-scale=1" : "width=device-width, initial-scale=1"} />
                  <title>{fullVersion ? 'full version' : 'mobile version'}</title>
                </Helmet>
                {isMobile && !fullVersion ? (
                  <Mobile
                    tablesData={tablesData}
                    changeVersion={changeVersion}
                    fullVersion={fullVersion}
                  />
                ) : (
                  <Pc
                    tablesData={tablesData}
                    changeVersion={changeVersion}
                    fullVersion={fullVersion}
                    isMobile={isMobile}
                  />
                )}
              </div>
            </LoadingContext.Provider>
          </PeriodContext.Provider>
        </TablesContext.Provider>
      </ChosenCityContext.Provider>
    </UserContext.Provider>
  )
}

export default App