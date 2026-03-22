import { AuthenticationResult } from "../../Domain/Entities/Authentication/AuthenticationResult";
import { GeneralApiResult } from "../DataTransferObjects/GeneralApiResult";

export interface IAuthService {
    Refresh(): Promise<AuthenticationResult>;
    ProtectedAccess<T>(fn: () => T): Promise<T>;
    AfterLogin(fn: () => Promise<GeneralApiResult<Date>>): Promise<AuthenticationResult>;
}