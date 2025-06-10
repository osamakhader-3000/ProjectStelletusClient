import {User} from "../../../Domain/Entities/User";
import { IUserApi } from "../Interfaces/IUserApi";
import urls from '../urls.json'
import axios from 'axios';

export class UserApi implements IUserApi{

     private token:string;
    private baseUrl:string;

    constructor(){
        this.baseUrl = urls['tasksdomain'];
        this.token = localStorage.getItem("jwt")??'';
    }

    async ListUsers(): Promise<User[]> {
        let url = urls['users-list'];
         let response = await axios.get(`${this.baseUrl}/${url}`            
            ,{
                headers:{Authorization: `Bearer ${this.token}`},
                params:{token:this.token}
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