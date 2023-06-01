import { Town, UserResponse } from "@api/user/types";
import { Article } from "@api/statistics/types";
import {IUserSHProfile} from "@api/shProfile/types";

export interface ChosenCityContextType {
  chosenCity: Town
  chooseCity: (city: Town) => void
}

export interface UserContextType {
  user: UserResponse
  addUser: (user: UserResponse) => void
}

export interface TablesContextType {
  tablesData: Article[]
  addKey: (newKeyValue: string, article: Article) => void
  deleteKey: (keyId: string, article: Article) => void
  setNewTableData: (data: Article[]) => void
}

export interface PeriodContextType {
  chosenPeriod: string[]
  setPeriod: (data: string[]) => void
}
export interface LoadingContextType {
  loading: boolean
  setLoadingStatus: (status: boolean) => void
}
export interface ShProfileContextType {
  profile: IUserSHProfile | null
  setProfile: (profile: IUserSHProfile | null) => void
}
