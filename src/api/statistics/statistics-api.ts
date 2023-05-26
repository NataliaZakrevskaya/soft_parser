import axios from "axios";
import {CreateArticleRequest, CreateArticleResponse} from "@api/statistics/types";
import {STATISTIC_CREATE_URL} from "@api/statistics/constants";

export const statisticsApi = {
  async createArticle(data: CreateArticleRequest){
    return await axios.post<CreateArticleResponse>(STATISTIC_CREATE_URL, data).then(res => res.data)
  },
}