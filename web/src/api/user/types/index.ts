interface IAddress {
    address: string
    addressId: string
    _id: string
}
export interface Town {
    _id: string
    city: string
    city_id: string
    addresses: IAddress[]
}
export interface UserResponse{
    towns: Town[],
    userId: number
}
export interface CreateUserResponse {
    data: UserResponse
}
export interface FetchUserData {
    _id: string
    userId: number
    towns: Town[]
}
export interface FetchUserResponse {
    data: FetchUserData
}

export interface UpdateTownBody {
    city: string
    addresses: string[]
}
export interface UpdateUserData {
    towns: UpdateTownBody[]
}
export interface IPWZ {
    _id: string
    name: string
}
export interface CreateArticlePWZ{
    name: string
}
export interface CreateArticleTown {
    city: string
    _id: string
    pwz: CreateArticlePWZ[]
}