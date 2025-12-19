import { User } from '../../Domain/Entities/User';
import { LoginResult } from '../../Domain/Entities/Authentication/LoginResult';
import RefreshResult from '../../Domain/Entities/Authentication/RefreshResult';
import { MessageInfo } from '../../Domain/Entities/Authentication/MessageInfo';

export interface IAuthRepository {
  CreateAccount(user: User): Promise<void>;
  LoginAccount(user: User): Promise<{loginResult: LoginResult, messageInfo: MessageInfo}>;
  CheckLoggedIn(): Promise<boolean>;
  Logout(): Promise<void>;
  FetchUser(token: string): Promise<User>;
  GetLoginExpireTime(): Date | null;
  SetLoginExpireTime(expireTime: Date): void;
  Refresh(): Promise<{ refreshResult:RefreshResult,messageInfo:MessageInfo}>;
}