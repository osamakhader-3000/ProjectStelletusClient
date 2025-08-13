import {User} from '../../../Domain/Entities/User'
import {LoginRequest} from '../../DataTransferObjects/LoginRequest'
import GeneralApiResult from '../../../Application/DataTransferObjects/GeneralApiResult'

export interface IAuthApi{
    CreateAccount(user:User):Promise<void>;
    LoginAccount(loginRequest:LoginRequest):Promise<GeneralApiResult>;
    CheckLoggedIn():Promise<boolean>;
    Logout():Promise<void>;
    FetchUser(token:string):Promise<User>;
}