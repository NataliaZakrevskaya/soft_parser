import {AxiosRequestConfig, AxiosResponseHeaders} from "axios/index";

export type AxiosResponse<T = any, D = any> = {
  data: T,
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: AxiosRequestConfig<D>;
  request?: any;
}