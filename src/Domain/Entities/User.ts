export class User {
    ID: string;
    Name: string;
    Email: string;
    Password: string;
    Token:string;

    constructor() {
        this.ID = '00000000-0000-0000-0000-000000000000';
        this.Name = '';
        this.Email = '';
        this.Password = '';
        this.Token = '';
    }
}