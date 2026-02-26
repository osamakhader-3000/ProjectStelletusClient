export class User {
   
    ID: string|null;
    Username: string | null;
    Email: string;
    Password: string | null;
    Token: string | null;

    constructor(id: string|null , username: string | null = null, email: string, password: string | null = null, token: string | null = null) {
        this.ID = id;
        this.Username = username;
        this.Email = email;
        this.Password = password;
        this.Token = token;
    }
}