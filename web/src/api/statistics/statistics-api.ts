import axios from "axios";
import {
  addKeyByArticleRequest,
  CreateArticleRequest,
  CreateArticleResponse,
  findByCityRequest,
  removeArticleRequest,
  removeKeyRequest,
} from "@api/statistics/types";
import {
  ADD_KEY_BY_ARTICLE_URL,
  FIND_BY_CITY_URL,
  REMOVE_ARTICLE_URL,
  REMOVE_KEY_URL,
  STATISTIC_CREATE_URL,
  STATISTIC_GET_URL
} from "@api/statistics/constants";
import {instance} from "@api/config";

export const statisticsApi = {
  async createArticle(data: CreateArticleRequest){
    return await instance.post<CreateArticleResponse>(STATISTIC_CREATE_URL, data).then(res => res.data)
  },
  async getStatistics(userId: string){
    return await instance.post<CreateArticleResponse>(`${STATISTIC_GET_URL}${userId}`).then(res => res.data)
  },
  async findByCity(data: findByCityRequest){
    return await instance.post<CreateArticleResponse>(FIND_BY_CITY_URL, data).then(res => res.data)
  },
  async addKeyByArticle(data: addKeyByArticleRequest){
    return await instance.post<CreateArticleResponse>(ADD_KEY_BY_ARTICLE_URL, data).then(res => res.data)
  },
  async removeArticle(data: removeArticleRequest){
    return await instance.delete<CreateArticleResponse>(REMOVE_ARTICLE_URL, {data: data}).then(res => res.data)
  },
  async removeKey(data: removeKeyRequest){
    return await instance.delete<CreateArticleResponse>(REMOVE_KEY_URL, {data: data}).then(res => res.data)
  },
}