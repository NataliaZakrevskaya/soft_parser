import {IPWZ} from "../../../components/Common/Modal/EditPVZList/types";

export interface Town {
    _id: string
    city: string
    pwz: IPWZ[]
}

export interface CreateUserResponse {
    data: {
        email: string,
        telegramId: string,
        towns: Town[],
        _id: string
    },
}
