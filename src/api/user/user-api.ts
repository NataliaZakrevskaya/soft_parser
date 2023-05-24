import axios from "axios";
import {FetchAddressesByTownResponse, FetchCitiesResponse} from "../geo/types";
import {FETCH_ALL_CITIES, FETCH_BY_TOWN} from "../geo/constants";

export const userApi = {
  async fetchCities(){
    return await axios.get<FetchCitiesResponse>(FETCH_ALL_CITIES).then(res => res.data)
  },
  // async fetchAddressesByTown(city: string){
  //   return await axios.get<FetchAddressesByTownResponse>(`${FETCH_BY_TOWN}${city}`).then(res => res.data)
  // },
}