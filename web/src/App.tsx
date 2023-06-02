import React, {createContext, useEffect, useState} from 'react'
import './static/css/global.scss'
import {useWindowSize} from "@utils/hooks/useWindowSize";
import Pc from "./components/Versions/PC/PC";
import {Helmet} from "react-helmet";
import Mobile from "./components/Versions/Mobile/Mobile";
import {Town, UserResponse} from "@api/user/types";
import {chosenCityInitial, userInitial} from "@mocks/index";
import {userApi} from "@api/user/user-api";
import {statisticsApi} from "@api/statistics/statistics-api";
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {addKeyByArticleRequest, Article} from "@api/statistics/types";
import {
  ChosenCityContextType,
  LoadingContextType,
  PeriodContextType,
  ShProfileContextType,
  TablesContextType,
  UserContextType
} from "./types";
import Loading from "@components/Common/Loading/Loading";
import styles from "@components/Common/Modal/AddArticle/AddArticle.module.scss";
import {IUserSHProfile} from "@api/shProfile/types";
import {shProfileApi} from "@api/shProfile/shProfile-api";
import {NonAuth} from "@components/NonAuth/page";

export const ChosenCityContext = createContext<null | ChosenCityContextType>(null);
export const UserContext = createContext<null | UserContextType>(null);
export const TablesContext = createContext<null | TablesContextType>(null);
export const PeriodContext = createContext<null | PeriodContextType>(null);
export const LoadingContext = createContext<null | LoadingContextType>(null);
export const ShProfileContext = createContext<null | ShProfileContextType>(null);
export const App: React.FC = () => {

  const [isMobile, setIsMobile] = useState(false)
  const [fullVersion, setFullVersion] = useState(false)
  const [chosenCity, setChosenCity] = useState<Town>(chosenCityInitial)
  const [user, setUser] = useState<UserResponse>(userInitial)
  const [tablesData, setTablesData] = useState<Article[]>([])
  const [chosenPeriod, setChosenPeriod] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [profileSh, setProfileSh] = useState<IUserSHProfile | null>(null)
  const [auth, setAuth] = useState<boolean>(false)
  const {width} = useWindowSize()
  const changeVersion = () => setFullVersion(!fullVersion)
  const chooseCity = (city: Town) => setChosenCity(city)
  const setNewTableData = (data: Article[]) => setTablesData(data)
  const addUser = (user: UserResponse) => setUser(user)
  const addKeyByArticle = async(data: addKeyByArticleRequest) => {
    await statisticsApi.addKeyByArticle(data)
      .then(res => {
        //@ts-ignore
        if(res.errors?.length > 0){
          //@ts-ignore
          toast(res.errors[0].message, {
            type: 'error',
            className: styles.toastMessage
          })
        }
      })
    const dataUser = {
      city: chosenCity.city_id,
      periods: chosenPeriod
    }
    await statisticsApi.findByCity(dataUser).then(res => setTablesData(res.data))

  }
  const addKey = async(newKeyValue: string, article: Article) => {
    setLoading(true)

    const data = {
      article: article.article,
      cityId: article.city_id,
      keys: [newKeyValue.trim()]
    }
    addKeyByArticle(data)

    const dataUser = {
      city: chosenCity.city_id,
      periods: chosenPeriod
    }
    await statisticsApi.findByCity(dataUser)
      .then(res => setTablesData(res.data))
      .finally(() => setLoading(false))
  }
  const deleteKey = async(keyId: string, article: Article) => {
    setLoading(true)
    const data = {
      article: article.article,
      cityId: article.city_id,
      keyId
    }
    await statisticsApi.removeKey(data)
    const dataUser = {
      city: chosenCity.city_id,
      periods: chosenPeriod
    }
    await statisticsApi.findByCity(dataUser)
      .then(res => setTablesData(res.data))
      .finally(() => setLoading(false))
  }
  const setPeriod = (data: string[]) => setChosenPeriod(data)
  const setLoadingStatus = (status: boolean) => setLoading(status)
  const setProfile = (profile: IUserSHProfile | null) => setProfileSh(profile)

  useEffect(() => {
    width > 639 ? setIsMobile(false) : setIsMobile(true)
  }, [width])
  useEffect(() => {

  }, [])
  useEffect(() => {
    if(user.userId && chosenCity._id && chosenPeriod.length > 0){
      setLoading(true)
      const data = {
        city: chosenCity.city_id,
        periods: chosenPeriod
      }
      statisticsApi.findByCity(data)
        .then(res => setTablesData(res.data))
        .finally(() => setLoading(false))
    }

  }, [user, chosenCity, chosenPeriod])
  const getShProfile = async() => {
    const profile = await shProfileApi.fetchShProfile().then(res => res)
    setProfileSh(profile)
  }
  const getUser = async() => {
    let token = localStorage.getItem('sellershub-token')
    if(token === null) {
      setAuth(false)
    } else{
      setAuth(true)
      getShProfile()
      const data = await userApi.fetchUser()
        .then(res => res)
      //@ts-ignore
      if(data.errors.length > 0){
        await userApi.createUser()
      }
      await userApi.fetchUser().then(res => {
        setUser(res.data)
        const data = res.data.towns.find(town => town.city_id === "6478fd9630e79c580489ba43")
        if(data){
          setChosenCity(data)
        } else {
          if(res.data?.towns?.length > 0)
          setChosenCity(res.data.towns[0])
        }
      })
    }
  }

  useEffect(() => {
    getUser()
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
              <ShProfileContext.Provider
                value={{
                  profile: profileSh,
                  setProfile
                }}>

                <div className="appContainer">
                  {auth ? (
                    <>
                      <ToastContainer/>
                      <Loading active={loading}/>
                      {/*<Helmet>*/}
                      {/*  <meta name="viewport"*/}
                      {/*        content={fullVersion ? "width=device-1920, initial-scale=0.25, min-scale=0.2, max-scale=1" : "width=device-width, initial-scale=1"}/>*/}
                      {/*  <title>{fullVersion ? 'full version' : 'mobile version'}</title>*/}
                      {/*</Helmet>*/}
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
                    </>
                  ) : (
                    <NonAuth/>
                  )}
                </div>
              </ShProfileContext.Provider>
            </LoadingContext.Provider>
          </PeriodContext.Provider>
        </TablesContext.Provider>
      </ChosenCityContext.Provider>
    </UserContext.Provider>
  )
}

export default App