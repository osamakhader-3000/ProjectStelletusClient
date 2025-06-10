import axios from 'axios';
import {User} from '../../../Domain/Entities/User'
import {LoginRequest} from '../../DataTransferObjects/LoginRequest'
import { IAuthApi } from '../Interfaces/IAuthApi'
import urls from '../urls.json'


export class AuthApi implements IAuthApi{
    
    private baseUrl:string;
    private token:string;

    constructor(){
        this.baseUrl =  urls["security-app-domain"];
        this.token = localStorage.getItem("jwt")??'';
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

    async LoginAccount(loginRequest: LoginRequest): Promise<void> {
        let url = urls['login'];
        await axios.post(`${this.baseUrl}/${url}`
            ,loginRequest
            ,{
                headers:{Authorization: `Bearer ${this.token}`}
            }
        );

       

    }

    async CheckLoggedIn(): Promise<boolean> {
        let url = urls['logout'];
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