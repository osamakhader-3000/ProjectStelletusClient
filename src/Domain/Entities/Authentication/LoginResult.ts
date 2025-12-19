export class LoginResult {     
    expireTime: Date|null;
    constructor(public ExpireTime: Date | null = null){
        this.expireTime = ExpireTime;      
    }   
}    