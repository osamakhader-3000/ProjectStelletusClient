export class LoginResponse {     
    expireTime: Date;
    constructor(public ExpireTime: Date){
        this.expireTime = ExpireTime;      
    }    
}
