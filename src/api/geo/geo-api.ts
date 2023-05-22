import axios from "axios";
import {AxiosResponse} from "../types";
import {ResponseCity} from "./types";
import {FETCH_ALL_CITIES} from "./constants";

export const geoIpi = {
  async fetchCities(){
    return await axios.get<ResponseCity[]>(FETCH_ALL_CITIES)
  },
}