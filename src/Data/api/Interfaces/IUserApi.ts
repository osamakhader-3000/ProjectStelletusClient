import {User} from '../../../Domain/Entities/User'
import {LoginRequest} from '../../DataTransferObjects/LoginRequest'
import { GeneralApiResult } from '../../DataTransferObjects/GeneralApiResult';

export interface IUserApi{
    CreateAccount(user:User):Promise<GeneralApiResult<Date>>;
    LoginAccount(loginRequest:LoginRequest):Promise<GeneralApiResult<Date>>;
    Logout():Promise<void>;
    FetchUser(token:string):Promise<GeneralApiResult<User>>;
    Test(): Promise<GeneralApiResult<boolean>>; 
    MicrosoftLoginCallBack(): Promise<GeneralApiResult<Date>>;
    GetCurrentUser(): Promise<GeneralApiResult<User>>;
    VerifyEmail(token: string): Promise<GeneralApiResult<boolean>>;
    ResendVerificationEmail(): Promise<GeneralApiResult<boolean>>;
}