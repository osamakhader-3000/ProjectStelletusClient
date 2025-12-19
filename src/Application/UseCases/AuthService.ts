import { User } from "../../Domain/Entities/User";
import { IAuthService } from "../Services/IAuthService";
import { IAuthRepository } from "../Repositories/IAuthRepository";
import { MessageInfo } from "../../Domain/Entities/Authentication/MessageInfo";

export class AuthService implements IAuthService{

    authRepository:IAuthRepository;

    constructor(authRepository:IAuthRepository){
        this.authRepository = authRepository;
    }

    async FetchUser(token: string): Promise<User> {
       return this.authRepository.FetchUser(token);
    }

    async CreateAccount(name:string,email:string,password:string): Promise<void> {
        let user = new User();
        user.Email = email;
        user.Name = name;
        user.Password = password;
        this.authRepository.CreateAccount(user);
    }

    async LoginAccount(name:string,password:string): Promise<MessageInfo> {
        let user = new User();
        user.Name = name;
        user.Password = password;
        let {loginResult,messageInfo} = await this.authRepository.LoginAccount(user);
        if(!messageInfo.hasError && loginResult.expireTime){
            this.authRepository.SetLoginExpireTime(new Date(loginResult.expireTime));
        }
        return messageInfo;
    }


    async CheckLoggedIn(): Promise<boolean> {
        
        let loginExpireDateTime = this.authRepository.GetLoginExpireTime(); 
        if(!loginExpireDateTime)
            return false;        

        let expired = true;// new Date() > loginExpireDateTime;
        if(expired){
            let {refreshResult ,messageInfo} = await this.authRepository.Refresh();
            if(!messageInfo.hasError && refreshResult.ExpirationDate)
            {
                this.authRepository.SetLoginExpireTime(refreshResult.ExpirationDate);
                return true;
            }

            return false;
        }         
        return true; 
    }

    async Logout(): Promise<void> {
        this.authRepository.Logout();
    }
}