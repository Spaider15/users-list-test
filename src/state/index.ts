export interface IState {
    users: IUsers;
}

export interface IUsers {
    loading: boolean;
    error: string;
    data: IUser[];
}

export interface IUser {
    email: string,
    name: string,
    objectId: string,
}