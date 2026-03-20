
import { User } from '../../../Domain/Entities/User.ts'
import { LoginRequest } from '../../DataTransferObjects/LoginRequest.ts'
import { IUserApi } from '../Interfaces/IUserApi.ts'
import urls from '../urls.json'
import { GeneralApi } from './GeneralApi.ts';
import axios from 'axios';
import { GeneralApiResult } from '../../DataTransferObjects/GeneralApiResult.ts';
import { TokenHolder } from '../../DataTransferObjects/TokenHolder.ts';

export class UserApi extends GeneralApi implements IUserApi {

    private baseUrl: string;

    constructor() {
        super();
        this.baseUrl = urls['security-app-domain'];

    }

    async Test(): Promise<GeneralApiResult<boolean>> {
        let url = urls['test'];
        let result = await this.GeneralApiCaller<boolean>('GET', url);
        return result;
    }


    async CreateAccount(user: User): Promise<GeneralApiResult<Date>> {

        let url = urls['create-account'];
        let result = await this.GeneralApiCaller<Date>('POST', url, user, null);
        return result;
    }


    async LoginAccount(loginRequest: LoginRequest): Promise<GeneralApiResult<Date>> {
        const url = urls['login'];
        let result = await this.GeneralApiCaller<Date>('POST', url, loginRequest);
        return result;
    }

    async Logout(): Promise<void> {
        let url = urls['logout'];
        axios({ method: 'GET', url: url, withCredentials: true });
    }

    async FetchUser(): Promise<GeneralApiResult<User>> {
        let url = urls['user-get'];
        let result = await this.GeneralApiCaller<User>('GET', url);
        return result;
    }

    async MicrosoftLoginCallBack(): Promise<GeneralApiResult<Date>> {
        let url = urls['microsoft-login-callback'];
        let result = await this.GeneralApiCaller<Date>('POST', url);
        return result;
    }

    async GetCurrentUser(): Promise<GeneralApiResult<User>> {
        let url = urls['current-user'];
        let result = await this.GeneralApiCaller<User>('GET', url);
        return result;
    }

    async VerifyEmail(token: string): Promise<GeneralApiResult<boolean>> {
        let tokenObj = new TokenHolder(token);
        let url = urls['verify-email'];
        let result = await this.GeneralApiCaller<boolean>('PUT', url, tokenObj);
        return result;
    }

    async ResendVerificationEmail(): Promise<GeneralApiResult<boolean>> {
        let url = urls['resend-verification-email'];
        let result = await this.GeneralApiCaller<boolean>('GET', url);
        return result;
    }


}


