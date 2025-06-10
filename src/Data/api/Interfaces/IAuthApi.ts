import {User} from '../../../Domain/Entities/User'
import {LoginRequest} from '../../DataTransferObjects/LoginRequest'

export interface IAuthApi{
    CreateAccount(user:User):Promise<void>;
    LoginAccount(loginRequest:LoginRequest):Promise<void>;
    CheckLoggedIn():Promise<boolean>;
    Logout():Promise<void>;
    FetchUser(token:string):Promise<User>;
}