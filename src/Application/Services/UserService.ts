import { User } from "../../Domain/Entities/User";
import { IUserService } from "../Interfaces/IUserService";
import { IUserRepository } from "../Repositories/IUserRepository";
import UserLogginStatus from "../../Domain/Entities/Authentication/UserLogginStatus";

export class UserService implements IUserService{

    userRepository:IUserRepository;

    constructor(userRepository:IUserRepository){
        this.userRepository = userRepository;
        
    }

    async Test(): Promise<boolean> {
        return this.userRepository.Test();
    }
       

    async FetchUser(token: string): Promise<User> {
       return this.userRepository.FetchUser(token);
    }

    
   

    async CreateAccount(user: User): Promise<boolean> {       
        let result = await this.userRepository.CreateAccount(user);       
        return result.success;
        
    }

    
    async LoginAccount(user: User): Promise<boolean> { 
        let loginResult = await this.userRepository.LoginAccount(user);
        return loginResult.success;
    }


    async CheckLoggedIn(): Promise<UserLogginStatus> {        


        let loginExpireDateTime = this.userRepository.GetLoginExpireTime(); 
        if( loginExpireDateTime == null){
            return new UserLogginStatus(false,false);
        }

        let expired = new Date() > loginExpireDateTime;
        if(expired)    
        {    
           let result = await this.userRepository.Refresh();
           if(!result.success)
               return new UserLogginStatus(false,true);
        }

        return new UserLogginStatus(true,false); 
    }

   

    async Logout(): Promise<void> {       
        this.userRepository.Logout();
    }

    
    
}
    