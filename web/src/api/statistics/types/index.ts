import {CreateArticleTown} from "@api/user/types";

export interface Position {
  _id: string;
  position: string;
  timestamp: string;
  difference: string;
}
export interface Pwz {
  _id: string;
  name: string;
  position: Position[];
}
export interface IAverage{
  _id: string
  timestamp: string
  average: number
}
export interface Key{
  _id: string,
  key: string,
  average: IAverage[]
  pwz: Pwz[],
}
export interface Article {
  _id: string,
  article: string,
  productName: string,
  userId: string,
  city: string,
  city_id: string,
  keys: Key[]
}
export interface CreateArticle {
  _id: string,
  article: string,
  productName: string,
  userId: string,
  city: string,
  city_id: string,
  keys: string[]
}
export interface FindByCityResponse {
  data: Article[]
}
export interface CreateArticleResponse{
  data: CreateArticle[]
}
export interface RemoveArticleResponse{
  data: {
    message: string
  }
}
export interface RemoveKeyResponse{
  data: {
    message: {
      message: string
    }
  }
}

export interface CreateArticleRequest{
  article: string,
  keys: string[],
  towns: CreateArticleTown[]
}
export interface findByCityRequest{
  city: string,
  periods: string[]
}
export interface addKeyByArticleRequest{
  article: string,
  cityId: string,
  keys: string[]
}
export interface removeArticleRequest{
  article: string,
  cityId: string,
}
export interface removeKeyRequest{
  article: string,
  cityId: string,
  keyId: string
}