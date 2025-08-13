import { User } from "../../Domain/Entities/User";
import { LoginRequest } from "../DataTransferObjects/LoginRequest";
import { IAuthRepository } from "../../Application/Repositories/IAuthRepository";
import { IAuthApi } from "../api/Interfaces/IAuthApi";
import { IAuthStorage } from "../LocalData/Interfaces/IAuthStorage";
import GeneralApiResult from "../../Application/DataTransferObjects/GeneralApiResult";

export class AuthRepository implements IAuthRepository{

    authApi:IAuthApi;
    authStorage:IAuthStorage;

    constructor(authApi:IAuthApi,authStorage:IAuthStorage){
        this.authApi = authApi;
        this.authStorage = authStorage;
    }

    async FetchUser(token: string): Promise<User> {
        return this.authApi.FetchUser(token);
    }

    async LoginAccount(user: User): Promise<GeneralApiResult> {        
        let loginReq = new LoginRequest();
        loginReq.Username = user.Name;
        loginReq.Password = user.Password;
        let result = await this.authApi.LoginAccount(loginReq);
        this.authStorage.SetToken(result.Data)
        return result;
    }

    async CreateAccount(user: User): Promise<void> {
        this.authApi.CreateAccount(user);
    }

    async CheckLoggedIn(): Promise<boolean> {
        if(this.authStorage.GetToken()==null)
            return false;
        else
            return this.authApi.CheckLoggedIn();
    }

    async Logout(): Promise<void> {
        this.authApi.Logout();
    }
}