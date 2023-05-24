import axios from "axios";
import {FetchCitiesResponse} from "../geo/types";
import {CREATE_PROFILE_URL, FETCH_PROFILE_URL} from "./constants";
import {CreateUserResponse} from "./types";

export const userApi = {
  async createUser(){
    return await axios.post<CreateUserResponse>(CREATE_PROFILE_URL, {
      telegramId: '',
      email: 'test1@mail.ru'
    }).then(res => res.data)
  },
  async fetchUser(email: string){
    return await axios.get<CreateUserResponse>(`${FETCH_PROFILE_URL}${email}`).then(res => res.data)
  },
  // async updateUser(email: string){
  //   return await axios.get<CreateUserResponse>(`${FETCH_PROFILE_URL}${email}`).then(res => res.data)
  // },
}