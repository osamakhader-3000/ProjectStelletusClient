import { GeneralApiResult } from '../../DataTransferObjects/GeneralApiResult';

export interface IAuthApi {

    Refresh(): Promise<GeneralApiResult<Date>>;

}