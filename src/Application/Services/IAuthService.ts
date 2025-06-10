import {User} from '../../Domain/Entities/User'

export interface IAuthService{
    CreateAccount(name:string,email:string,password:string): Promise<void>;
    LoginAccount(name:string,password:string): Promise<void>;
    CheckLoggedIn(): Promise<boolean>;
    Logout(): Promise<void>;
    FetchUser(token: string): Promise<User>;
}