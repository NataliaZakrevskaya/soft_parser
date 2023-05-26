import {Town} from "@api/user/types";

export interface Key{
  _id: string,
  key: string,
  article: string,
  email: string,
  telegramId: string,
  pwz: string[],
  __v: number
}
export interface Article {
  _id: string,
  article: string,
  productName: string,
  telegramId: string,
  email: string,
  city: string,
  city_id: string,
  keys: Key[]
}
export interface CreateArticleResponse{
  data: Article[]
}
export interface CreateArticleRequest{
  telegramId: string,
  email: string,
  article: string,
  keys: string[],
  towns: Town[]
}