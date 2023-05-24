export interface Town {
    city: string
    pwz: string[]
}

export interface CreateUserResponse {
    data: {
        email: string,
        telegramId: string,
        towns: Town[],
        _id: string
    },
}
