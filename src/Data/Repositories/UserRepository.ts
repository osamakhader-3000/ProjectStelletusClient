import { User } from "../../Domain/Entities/User.ts";
import { LoginRequest } from "../DataTransferObjects/LoginRequest.ts";
import { IUserRepository } from "../../Application/Repositories/IUserRepository.ts";
import { IUserApi } from "../api/Interfaces/IUserApi.ts";
import { IAuthStorage } from "../LocalData/Interfaces/IAuthStorage.ts";
import { AuthenticationResult } from "../../Domain/Entities/Authentication/AuthenticationResult.ts"; 
import { GeneralApiResult } from "../DataTransferObjects/GeneralApiResult.ts";
import { IAuthService } from "../Commons/IAuthService.ts";

export class UserRepository implements IUserRepository {

    protected userApi: IUserApi;
    protected authStorage: IAuthStorage;
    protected authService: IAuthService;

    constructor(userApi:IUserApi, authStorage:IAuthStorage, authService:IAuthService) {
        this.userApi = userApi;
        this.authStorage = authStorage;        
        this.authService = authService;
    }


    async FetchUser(token: string): Promise<User> {

        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<User>>>(async () => {
            return this.userApi.FetchUser(token);
        }); 
        return result.data??new User('','','','');
    }

    async LoginAccount(user: User): Promise<AuthenticationResult> {        
        if(!user.username || !user.password)
            throw new Error("Username and Password are required");

        let loginReq = new LoginRequest(user.username, user.password);
        
        return await this.authService.LoginAfter(async () => {
            let result = await this.userApi.LoginAccount(loginReq);
           return result;
        });
    }

    async CreateAccount(user: User): Promise<boolean> {
        
        
            let result= await this.userApi.CreateAccount(user);        
            return result.data??false;
        
    }
  

        GetLoginExpireTime(): Date| null {
            return this.authStorage.GetLoginExpireTime();
        }

        async Refresh(): Promise<AuthenticationResult> {
            return await this.authService.Refresh();
        }

    async Logout(): Promise<void> {   
        this.authStorage.RemoveCurrentUser(); 
        this.authStorage.RemoveLoginExpireTime();    
        this.userApi.Logout();
    }

    
    async Test(): Promise<boolean> {
        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<boolean>>>(async () => {
            return this.userApi.Test();
        });

       return result.resultMessage == '';
    }

    async MicrosoftLoginCallBack(): Promise<boolean> {
    
            let result = await this.userApi.MicrosoftLoginCallBack();
            return result.data??false;

    }

    async GetCurrentUser(): Promise<User | null> {

        let cachedUser = this.authStorage.GetCurrentUser();
        if(cachedUser)
            return cachedUser;

        let result = await this.authService.ProtectedAccess<Promise<GeneralApiResult<User>>>(async () => {
            return this.userApi.GetCurrentUser();
        });

        if(result.data)             
            this.authStorage.SetCurrentUser(result.data);

            
        return result?.data ?? null;
    }
}