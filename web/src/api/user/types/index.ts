import {IPWZ} from "@components/Common/Modal/EditPVZList/types";

export interface Town {
    _id: string
    city: string
    pwz: IPWZ[]
}
export interface UserResponse{
    email: string,
    telegramId: string,
    towns: Town[],
    _id: string
}
export interface CreateUserResponse {
    data: UserResponse
}

export interface UpdateTownBody {
    city: string
    addresses: string[]
}
export interface UpdateUserData {
    towns: UpdateTownBody[]
}