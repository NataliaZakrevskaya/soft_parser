import {
  addKeyByArticleRequest,
  CreateArticleRequest,
  CreateArticleResponse,
  findByCityRequest, FindByCityResponse,
  removeArticleRequest,
  RemoveArticleResponse,
  removeKeyRequest,
  RemoveKeyResponse,
} from "@api/statistics/types";
import {
  ADD_KEY_BY_ARTICLE_URL,
  FIND_BY_CITY_URL,
  REMOVE_ARTICLE_URL,
  REMOVE_KEY_URL,
  STATISTIC_CREATE_URL
} from "@api/statistics/constants";
import {instance} from "@api/config";

export const statisticsApi = {
  async createArticle(data: CreateArticleRequest){
    return await instance.post<CreateArticleResponse>(STATISTIC_CREATE_URL, data).then(res => res.data)
  },
  async findByCity(data: findByCityRequest){
    return await instance.post<FindByCityResponse>(FIND_BY_CITY_URL, data).then(res => res.data)
  },
  async addKeyByArticle(data: addKeyByArticleRequest){
    return await instance.post<CreateArticleResponse>(ADD_KEY_BY_ARTICLE_URL, data).then(res => res.data)
  },
  async removeArticle(data: removeArticleRequest){
    return await instance.delete<RemoveArticleResponse>(REMOVE_ARTICLE_URL, {data: data}).then(res => res.data)
  },
  async removeKey(data: removeKeyRequest){
    return await instance.delete<RemoveKeyResponse>(REMOVE_KEY_URL, {data: data}).then(res => res.data)
  },
}