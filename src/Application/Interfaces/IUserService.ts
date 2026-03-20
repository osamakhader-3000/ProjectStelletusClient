import UserLogginStatus from '../../Domain/Entities/Authentication/UserLogInStatus';
import {User} from '../../Domain/Entities/User'

export interface IUserService{
    CreateAccount(user: User): Promise<boolean>;
    LoginAccount(user: User): Promise<boolean>;
    CheckLoggedIn(): Promise<UserLogginStatus>;
    Logout(): Promise<void>;
    FetchUser(token: string): Promise<User>;
    Test(): Promise<boolean>;
    MicrosoftLoginCallBack(): Promise<boolean>;
    GetCurrentUser(): Promise<User | null>;
    VerifyEmail(token:string): Promise<boolean>;
    ResendVerificationEmail(): Promise<boolean>;
}