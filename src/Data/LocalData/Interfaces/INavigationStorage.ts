export interface INavigationStorage{
    SetRedirect(url:string):void;
    GetRedirect():string;
    DeleteRedirect():void;
}