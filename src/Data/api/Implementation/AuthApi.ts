import axios from 'axios';
import {User} from '../../../Domain/Entities/User'
import {LoginRequest} from '../../DataTransferObjects/LoginRequest'
import { IAuthApi } from '../Interfaces/IAuthApi'
import urls from '../urls.json'
import { GeneralApiResult } from '../../DataTransferObjects/GeneralApiResult';

export class AuthApi implements IAuthApi{
    
    private baseUrl:string;
    private token:string;

    constructor(){
        this.baseUrl =  urls['security-app-domain'];
        this.token = localStorage.getItem("token")??'';
    }

    async CreateAccount(user: User): Promise<void> {
        let url = urls['create-account'];
        await axios.post(`${this.baseUrl}/${url}`
            ,user
            ,{
                headers:{Authorization: `Bearer ${this.token}`}
            }
        );
    }

   async LoginAccount(loginRequest: LoginRequest): Promise<GeneralApiResult<string>> {    
    const url = urls['login'];
        try {
            const response = await axios.post(`${this.baseUrl}/${url}`, loginRequest);

            return new GeneralApiResult<string>(
                response.data.resultCode,
                response.data.resultMessage,
                response.data.data
            );
        } catch (error: any) {
            return new GeneralApiResult<string>(
                error.response?.status ?? -1,
                error.message ?? "Unknown error",
                null
            );
        }
    }


    async CheckLoggedIn(): Promise<boolean> {
        let url = urls['check-loggin'];
        let response = await axios.get(`${this.baseUrl}/${url}`
            ,{ withCredentials: true }
        );
         if(response.data)
            return true;
        else
            return false;
    }

    async Logout(): Promise<void> {
        let url = urls['logout'];
        await axios.get(`${this.baseUrl}/${url}`
            ,{ withCredentials: true }
        );
    }

    async FetchUser(token: string): Promise<User> {
        let url = urls['user-get'];
        let response = await axios.get(`${this.baseUrl}/${url}`            
            ,{
                headers:{Authorization: `Bearer ${this.token}`},
                params:{token:token}
            }
        );

         return response.data.map((u:User)=>({ID:u.ID,Name:u.Name,Password:u.Password,Email:u.Email}));
    }
 

    async Refresh(): Promise<GeneralApiResult<string>> {
    const url = urls["refresh-token"];

    try {
        const response = await axios.get(`${this.baseUrl}/${url}`, {
            withCredentials: true,
        });

        return new GeneralApiResult<string>(
            response.data.resultCode,
            response.data.resultMessage,
            response.data.data
        );
    } catch (err: any) {
        const status = err?.response?.status ?? -1;
        const message = err?.message ?? "Unknown error";
        return new GeneralApiResult<string>(status, message, null);
    }
    }
}


