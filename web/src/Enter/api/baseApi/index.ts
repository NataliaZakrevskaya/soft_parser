import axios, { AxiosInstance } from "axios"

class BaseApi {
    shApiPath = 'https://sellershub.ru/api/v1'
    axiosInstanse: AxiosInstance = axios.create({
        baseURL: this.shApiPath
    })

    constructor() {
         
    }
}

export default BaseApi