import axios from 'axios';
import {User} from '../../../Domain/Entities/User'
import {LoginRequest} from '../../DataTransferObjects/LoginRequest'
import { IAuthApi } from '../Interfaces/IAuthApi'
import urls from '../urls.json'
import GeneralApiResult from '../../../Application/DataTransferObjects/GeneralApiResult'

export class AuthApi implements IAuthApi{
    
    private baseUrl:string;
    private token:string;

    constructor(){
        this.baseUrl =  urls["security-app-domain"];
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

    async LoginAccount(loginRequest: LoginRequest): Promise<GeneralApiResult> {
        let token = '';
            let url = urls['login'];
            return await axios.post(`${this.baseUrl}/${url}`
                ,loginRequest
            )
            .then(function (response) {
                token = response.data.token;
                return new GeneralApiResult(false,'',token)
            })
            .catch(function (error) {
              return new GeneralApiResult(true,error.message,null); 
            });
    }

    async CheckLoggedIn(): Promise<boolean> {
        let url = urls['check-loggin'];
        let response = await axios.get(`${this.baseUrl}/${url}`
            ,{
                headers:{Authorization: `Bearer ${this.token}`}
            }
        );
         if(response.data)
            return true;
        else
            return false;
    }

    async Logout(): Promise<void> {
        let url = urls['logout'];
        await axios.get(`${this.baseUrl}/${url}`
            ,{
                headers:{Authorization: `Bearer ${this.token}`}
            }
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

         return response.data.map((u:User)=>({
                    ID:u.ID,
                    Name:u.Name,
                    Password:u.Password,
                    Email:u.Email
                }));
    }


}