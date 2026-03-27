import { GeneralApi } from "./GeneralApi";
import { IAuthApi } from "../Interfaces/IAuthApi";
import urls from '../urls.json'
import { GeneralApiResult } from "../../DataTransferObjects/GeneralApiResult";

export class AuthApi extends GeneralApi implements IAuthApi {
    Refresh(): Promise<GeneralApiResult<Date>> {
        const url = urls["refresh-token"];
        return this.GeneralApiCaller<Date>('POST', url);
    }
}