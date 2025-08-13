import { User } from '../../Domain/Entities/User';
import GeneralApiResult from '../DataTransferObjects/GeneralApiResult';

export interface IAuthRepository {
  CreateAccount(user: User): Promise<void>;
  LoginAccount(user: User): Promise<GeneralApiResult>;
  CheckLoggedIn(): Promise<boolean>;
  Logout(): Promise<void>;
  FetchUser(token: string): Promise<User>;
}