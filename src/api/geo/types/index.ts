interface Address{
  address: string
  cityName: string
}

export interface ResponseCity{
  _id: string
  city: string
  addresses: Address[]
}

export interface FetchCitiesResponse{
  data: ResponseCity[]
}