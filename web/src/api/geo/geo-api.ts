import {FetchAddressesByTownResponse, FetchCitiesResponse} from "./types";
import {FETCH_ALL_CITIES, FETCH_BY_TOWN} from "./constants";
import {instance} from "@api/config";

export const geoApi = {
  async fetchCities(){
    return await instance.get<FetchCitiesResponse>(FETCH_ALL_CITIES).then(res => res.data)
  },
  async fetchAddressesByTown(city: string){
    return await instance.get<FetchAddressesByTownResponse>(`${FETCH_BY_TOWN}${city}`).then(res => res.data)
  },
}