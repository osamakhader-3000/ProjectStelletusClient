import { User } from '../../Domain/Entities/User';
import { AuthenticationResult } from '../../Domain/Entities/Authentication/AuthenticationResult';

export interface IUserRepository {
  CreateAccount(user: User): Promise<AuthenticationResult>;
  LoginAccount(user: User): Promise<AuthenticationResult>;
  Logout(): Promise<void>;
  FetchUser(token: string): Promise<User>; 
  Test(): Promise<boolean>;
  GetLoginExpireTime(): Date | null;
  Refresh(): Promise<AuthenticationResult>;
  MicrosoftLoginCallBack(): Promise<boolean>;
  GetCurrentUser(): Promise<User | null>;
  VerifyEmail(token: string): Promise<boolean>;
  ResendVerificationEmail(): Promise<boolean>;
  GetUserAccount(): Promise<User>;
  ChangePassword(oldPassword: string, newPassword: string): Promise<boolean>;
  ListUsers():Promise<User[]>;
  SuspendUser(userId: string): Promise<boolean>;
  ActivateUser(userId: string): Promise<boolean>;
  ChangeUserRole(user: User): Promise<boolean>;
}