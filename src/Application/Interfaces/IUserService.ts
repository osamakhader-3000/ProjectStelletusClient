import UserLogginStatus from '../../Domain/Entities/Authentication/UserLogginStatus';
import {User} from '../../Domain/Entities/User'

export interface IUserService{
    CreateAccount(user: User): Promise<boolean>;
    LoginAccount(user: User): Promise<boolean>;
    CheckLoggedIn(): Promise<UserLogginStatus>;
    Logout(): Promise<void>;
    FetchUser(token: string): Promise<User>;
    Test(): Promise<boolean>;
}