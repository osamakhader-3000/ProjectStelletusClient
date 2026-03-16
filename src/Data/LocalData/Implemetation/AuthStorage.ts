import { User } from "../../../Domain/Entities/User";
import { IAuthStorage } from "../Interfaces/IAuthStorage";

export class AuthStorage implements IAuthStorage{
   
    GetLoginExpireTime(): Date | null { 
      
      //get expire time from local storage
      const storedValue = sessionStorage.getItem('loginExpireTime');

        if (!storedValue) return null;

        return new Date(storedValue);
    }

    SetLoginExpireTime(expireTime: Date): void {
        sessionStorage.setItem('loginExpireTime', expireTime.toString());
    }

    RemoveLoginExpireTime(): void {
        sessionStorage.removeItem('loginExpireTime');
    }

    GetCurrentUser(): User | null {
        const storedUser = sessionStorage.getItem('currentUser');
        if (!storedUser) return null;
        return JSON.parse(storedUser) as User;
    }

    SetCurrentUser(user: User): void {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    }

    RemoveCurrentUser(): void {
        sessionStorage.removeItem('currentUser');
    }

}
