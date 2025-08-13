export interface IAuthStorage{
    SetToken(Token: string): void;
    GetToken():string|null;    
}