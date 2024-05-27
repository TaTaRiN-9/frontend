interface IUser {
    id: number,
    email: string
}

export interface IUserResponse {
    user: IUser,
    access_token: string
}