import React, {createContext, useEffect, useState} from 'react'
import './static/css/global.scss'
import {useWindowSize} from "@utils/hooks/useWindowSize";
import Pc from "./components/Versions/PC/PC";
import {Helmet} from "react-helmet";
import Mobile from "./components/Versions/Mobile/Mobile";
import {Town, UserResponse} from "@api/user/types";
import {chosenCityInitial, userInitial} from "@mocks/index";
import {userApi} from "@api/user/user-api";

export interface ChosenCityContextType{
  chosenCity: Town
  chooseCity: (city: Town) => void
}

export interface UserContextType{
  user: UserResponse
  addUser: (user: UserResponse) => void
}

export const ChosenCityContext = createContext<null | ChosenCityContextType>(null);
export const UserContext = createContext<null | UserContextType>(null);
export const App: React.FC = () => {

  const [isMobile, setIsMobile] = useState(false)
  const [fullVersion, setFullVersion] = useState(false)
  const [chosenCity, setChosenCity] = useState<Town>(chosenCityInitial)
  const [user, setUser] = useState<UserResponse>(userInitial)

  const {width} = useWindowSize()
  const changeVersion = () => setFullVersion(!fullVersion)
  const chooseCity = (city: Town) => setChosenCity(city)
  const addUser = (user: UserResponse) => setUser(user)

  useEffect(() => {
    width > 639 ? setIsMobile(false) : setIsMobile(true)
  }, [width])
  useEffect(() => {
    userApi.fetchUser('test@mail.ru').then(res => {
      setUser(res.data)
    })
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
        <div className="appContainer">
          <Helmet>
            <meta name="viewport"
                  content={fullVersion ? "width=device-1920, initial-scale=0.25, min-scale=0.2, max-scale=1" : "width=device-width, initial-scale=1"}/>
            <title>{fullVersion ? 'full version' : 'mobile version'}</title>
          </Helmet>
          {isMobile && !fullVersion ? (
            <Mobile
              changeVersion={changeVersion}
              fullVersion={fullVersion}
            />
          ) : (
            <Pc
              changeVersion={changeVersion}
              fullVersion={fullVersion}
              isMobile={isMobile}
            />
          )}
        </div>
      </ChosenCityContext.Provider>
    </UserContext.Provider>
  )
}

export default App