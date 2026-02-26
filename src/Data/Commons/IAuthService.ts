import { AuthenticationResult } from "../../Domain/Entities/Authentication/AuthenticationResult";
import { GeneralApiResult } from "../DataTransferObjects/GeneralApiResult";

export interface IAuthService {
    Refresh(): Promise<AuthenticationResult>;
    ProtectedAccess<T>(fn: () => T): Promise<T>;
    LoginAfter(fn: () => Promise<GeneralApiResult<Date>>): Promise<AuthenticationResult>;
}