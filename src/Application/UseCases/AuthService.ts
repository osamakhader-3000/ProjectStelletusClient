import { User } from "../../Domain/Entities/User";
import { IAuthService } from "../Services/IAuthService";
import { IAuthRepository } from "../../Domain/Repositories/IAuthRepository";

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

    async LoginAccount(name:string,password:string): Promise<void> {
        let user = new User();
        user.Name = name;
        user.Password = password;
        this.authRepository.LoginAccount(user);
    }


    async CheckLoggedIn(): Promise<boolean> {
       return this.authRepository.CheckLoggedIn();
    }

    async Logout(): Promise<void> {
        this.authRepository.Logout();
    }


}