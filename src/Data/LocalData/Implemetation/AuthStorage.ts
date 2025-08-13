import { IAuthStorage } from "../Interfaces/IAuthStorage";

export class AuthStorage implements IAuthStorage{
    GetToken(): string | null {
        if(localStorage.getItem('token')!=null)
            return localStorage.getItem('token');
        return null;
    }

    SetToken(token: string): void {
        localStorage.setItem('token',token);
    }

}