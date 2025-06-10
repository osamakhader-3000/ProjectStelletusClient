import { User } from "../../Domain/Entities/User";
import { LoginRequest } from "../DataTransferObjects/LoginRequest";
import { IAuthRepository } from "../../Domain/Repositories/IAuthRepository";
import { IAuthApi } from "../api/Interfaces/IAuthApi";

export class AuthRepository implements IAuthRepository{

    authApi:IAuthApi;

    constructor(authApi:IAuthApi){
        this.authApi = authApi;
    }

    async FetchUser(token: string): Promise<User> {
        return this.authApi.FetchUser(token);
    }

    async LoginAccount(user: User): Promise<void> {
        let loginReq = new LoginRequest();
        loginReq.Username = user.Name;
        loginReq.Password = user.Password;
        this.authApi.LoginAccount(loginReq);
    }

    async CreateAccount(user: User): Promise<void> {
        this.authApi.CreateAccount(user);
    }

    async CheckLoggedIn(): Promise<boolean> {
       return this.authApi.CheckLoggedIn();
    }

    async Logout(): Promise<void> {
        this.authApi.Logout();
    }
}