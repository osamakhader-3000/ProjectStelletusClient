import {User} from '../../Domain/Entities/User'
import { MessageInfo } from '../../Domain/Entities/Authentication/MessageInfo';

export interface IAuthService{
    CreateAccount(name:string,email:string,password:string): Promise<void>;
    LoginAccount(name:string,password:string): Promise<MessageInfo>;
    CheckLoggedIn(): Promise<boolean>;
    Logout(): Promise<void>;
    FetchUser(token: string): Promise<User>;
}