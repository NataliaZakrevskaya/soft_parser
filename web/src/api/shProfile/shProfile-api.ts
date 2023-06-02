import axios from "axios";
import {IUserSHProfile} from "@api/shProfile/types";
import {SELLERSHUB_URL} from "@api/shProfile/constants";

export const shProfileApi = {
  async fetchShProfile(){
    try {
      const token = localStorage.getItem('sellershub-token')

      const response = await axios(`${SELLERSHUB_URL}v1/profiles/me`,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => res.data)
      console.log('respo',response)
      const result: IUserSHProfile = {
        id: response?.data?.id,
        avatar: {
          url: response?.data?.attributes?.avatar?.data?.attributes?.url
            ? `https://sellershub.ru/api${response?.data?.attributes?.avatar?.data?.attributes?.url}`
            : '',
        },
        company: response?.data?.attributes?.company,
        first_name: response?.data?.attributes?.first_name,
        last_name: response?.data?.attributes?.last_name,
        nickname: response?.data?.attributes?.nickname,
        real_name: response?.data?.attributes?.real_name,
      }

      return result
    } catch (error: any) {
      throw error
    }  },

}