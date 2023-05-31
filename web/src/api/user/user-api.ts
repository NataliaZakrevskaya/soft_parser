import {CREATE_PROFILE_URL, DEFAULT_PROFILE_URL, FETCH_PROFILE_URL, UPDATE_PROFILE_URL} from './constants'
import {CreateUserResponse} from "./types";
import {instance} from "@api/config";

export const userApi = {
  async createUser(){
    return await instance.post<CreateUserResponse>(CREATE_PROFILE_URL).then(res => res.data)
  },
  async fetchUser(){
    return await instance.get<CreateUserResponse>(FETCH_PROFILE_URL).then(res => res.data)
  },
  async updateUser(data: any){
    return await instance.put<CreateUserResponse>(UPDATE_PROFILE_URL, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.data)
  },
  async setDefaultSettings(){
    return await instance.put<CreateUserResponse>(DEFAULT_PROFILE_URL).then(res => res.data)
  },
}