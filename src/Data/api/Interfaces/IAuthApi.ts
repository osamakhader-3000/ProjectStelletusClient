import {User} from '../../../Domain/Entities/User'
import {LoginRequest} from '../../DataTransferObjects/LoginRequest'
import { GeneralApiResult } from '../../DataTransferObjects/GeneralApiResult';

export interface IAuthApi{
    CreateAccount(user:User):Promise<void>;
    LoginAccount(loginRequest:LoginRequest):Promise<GeneralApiResult<string>>;
    CheckLoggedIn():Promise<boolean>;
    Logout():Promise<void>;
    FetchUser(token:string):Promise<User>;
    Refresh():Promise<GeneralApiResult<string>>;    
}