// interface Address{
//   address: string
//   cityName: string
// }

export interface ResponseCity{
  _id: string
  city: string
  addresses: string[]
}

export interface FetchCitiesResponse{
  data: {
    towns: ResponseCity[],
    size: number
  }
}

export interface ResponseAddress{
  address: string
  cityName: string
  pickupType: number
  url: string
  urls: string
  _id: string
}

export interface FetchAddressesByTownResponse{
  data: {
    addresses: ResponseAddress[],
    size: number
  }
}