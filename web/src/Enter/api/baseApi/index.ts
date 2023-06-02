import axios, { AxiosInstance } from "axios"

class BaseApi {
    shApiPath = 'https://sellershub.ru/api/v1'
    shWebPath = 'https://sellershub.ru'
    axiosInstanse: AxiosInstance = axios.create({
        baseURL: this.shApiPath
    })

    constructor() {
         
    }
}

export default BaseApi