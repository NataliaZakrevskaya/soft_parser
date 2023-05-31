import {Town} from "@api/user/types";



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
export interface Key{
  _id: string,
  key: string,
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
export interface CreateArticleResponse{
  data: Article[]
}
export interface CreateArticleRequest{
  telegramId: string,
  // email: string,
  userId: string,
  article: string,
  keys: string[],
  towns: Town[]
}
export interface findByCityRequest{
  userId: string,
  city: string,
  periods: string[]
}
export interface addKeyByArticleRequest{
  article: string,
  cityId: string,
  userId: string,
  keys: string[]
}
export interface removeArticleRequest{
  article: string,
  cityId: string,
  userId: string
}
export interface removeKeyRequest{
  article: string,
  cityId: string,
  userId: string,
  keyId: string
}