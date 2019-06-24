import { IUser } from "../state";

const API_URL = 'http://api.backendless.com/53FB6874-BEE0-9546-FFCA-1F3DEE56BE00/73E38E38-C5C9-45B2-FFB5-D05A6E16A600/data/Users';

export default class User {
    static makeRequest(url: string, method: string = 'GET', body?: string, ) {
        const opts: {body?: string, method?: string, headers: any} = {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
            },
            method
        };
        if (body) {
            opts.body = body;
        }
        return fetch(url, opts)
        .then(response => response.json())
    }

    static getUsersList() {
        return User.makeRequest(API_URL);
    }

    static createUser(user: IUser) {
        return User.makeRequest(API_URL, "POST", JSON.stringify({...user, password: '123456'}));
    }

    static editUser(user: IUser, userId: string) {
        return User.makeRequest(API_URL + `/${userId}`, "PUT", JSON.stringify(user));
    }

    static removeUser(userId: string) {
        return User.makeRequest(API_URL + `/${userId}`, "DELETE");
    }
}