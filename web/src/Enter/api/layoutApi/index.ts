import BaseApi from "../baseApi"
import { FETCH_CATEGORIES_URL } from "./constant"

class LayoutApi extends BaseApi{
    
    
    async fetchCategories<T>() {
        try {
            const response = await this.axiosInstanse.get<T>(FETCH_CATEGORIES_URL)
            return response.data
        } catch (e: any) {
            Promise.reject(e.message)
        }
    }
}

const layoutApi = new LayoutApi()

export default layoutApi