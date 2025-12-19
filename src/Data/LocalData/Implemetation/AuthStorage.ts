import { IAuthStorage } from "../Interfaces/IAuthStorage";

export class AuthStorage implements IAuthStorage{
   
    GetLoginExpireTime(): Date | null { 
        const storedValue = AuthStore.loginExpireTime;
        if (!storedValue) return null;

        return storedValue;
    }

    SetLoginExpireTime(expireTime: Date): void {
        AuthStore.loginExpireTime = expireTime;
    }

}


const AuthStore = {
  loginExpireTime: null
} as {
  loginExpireTime: Date | null;
 
};

