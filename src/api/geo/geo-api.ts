import axios from "axios";
import {FetchAddressesByTownResponse, FetchCitiesResponse} from "./types";
import {FETCH_ALL_CITIES, FETCH_BY_TOWN} from "./constants";

export const geoApi = {
  async fetchCities(){
    return await axios.get<FetchCitiesResponse>(FETCH_ALL_CITIES).then(res => res.data)
  },
  async fetchAddressesByTown(city: string){
    return await axios.get<FetchAddressesByTownResponse>(`${FETCH_BY_TOWN}${city}`).then(res => res.data)
  },
}