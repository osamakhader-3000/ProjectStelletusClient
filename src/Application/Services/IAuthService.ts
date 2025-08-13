import {User} from '../../Domain/Entities/User'
import GeneralApiResult from '../DataTransferObjects/GeneralApiResult'

export interface IAuthService{
    CreateAccount(name:string,email:string,password:string): Promise<void>;
    LoginAccount(name:string,password:string): Promise<GeneralApiResult>;
    CheckLoggedIn(): Promise<boolean>;
    Logout(): Promise<void>;
    FetchUser(token: string): Promise<User>;
}