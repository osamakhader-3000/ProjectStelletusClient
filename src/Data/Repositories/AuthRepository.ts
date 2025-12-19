import { User } from "../../Domain/Entities/User";
import { LoginRequest } from "../DataTransferObjects/LoginRequest";
import { IAuthRepository } from "../../Application/Repositories/IAuthRepository";
import { IAuthApi } from "../api/Interfaces/IAuthApi";
import { IAuthStorage } from "../LocalData/Interfaces/IAuthStorage";
import { LoginResult } from "../../Domain/Entities/Authentication/LoginResult"; 
import { MessageInfo } from "../../Domain/Entities/Authentication/MessageInfo";
import RefreshResult from "../../Domain/Entities/Authentication/RefreshResult";

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

    async LoginAccount(user: User): Promise<{loginResult: LoginResult, messageInfo: MessageInfo}> {        
        let loginReq = new LoginRequest();
        loginReq.Username = user.Name;
        loginReq.Password = user.Password;
        let result = await this.authApi.LoginAccount(loginReq);

        let loginResult = result.resultCode == 200 && result.data ? new LoginResult(new Date(result.data)) : new LoginResult();
        let messageInfo = result.resultCode != 200 ? new MessageInfo(result.resultMessage, true) : new MessageInfo('', false);
       
        return {loginResult, messageInfo};
    }

    async CreateAccount(user: User): Promise<void> {
        this.authApi.CreateAccount(user);
    }

    async CheckLoggedIn(): Promise<boolean> {

        return await this.authApi.CheckLoggedIn();
    }

    async Logout(): Promise<void> {
        this.authApi.Logout();
    }

    async Refresh(): Promise<{ refreshResult:RefreshResult,messageInfo:MessageInfo}> {           
        let refresh = await this.authApi.Refresh();
        let refreshResult = refresh.resultCode == 200 && refresh.data ? new RefreshResult(new Date(refresh.data)) : new RefreshResult();
        let messageInfo = refresh.resultCode != 200 ? new MessageInfo(refresh.resultMessage, true) : new MessageInfo('', false);
        return {refreshResult, messageInfo};
    }


    GetLoginExpireTime(): Date | null { 
        return this.authStorage.GetLoginExpireTime();
    }

    SetLoginExpireTime(expireTime: Date): void {
        this.authStorage.SetLoginExpireTime(expireTime);
    }



    IsTokenExpired(token: string): boolean {
        try {
            const [, payloadBase64] = token.split(".");
            const payload = JSON.parse(atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/")));
            const exp = payload.exp * 1000; // convert seconds → ms
            return Date.now() >= exp;
        } catch {
            return true; // treat broken tokens as expired
        }
    }
}