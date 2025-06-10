import { User } from '../Entities/User';

export interface IAuthRepository {
  CreateAccount(user: User): Promise<void>;
  LoginAccount(user: User): Promise<void>;
  CheckLoggedIn(): Promise<boolean>;
  Logout(): Promise<void>;
  FetchUser(token: string): Promise<User>;
}