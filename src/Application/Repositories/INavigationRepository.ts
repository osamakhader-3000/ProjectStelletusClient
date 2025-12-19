export interface INavigationRepository{
    SetRedirect(url:string):void;
    GetRedirect():string;
    DeleteRedirect():void;
    GetMicrosoftLoginUrl():string;
}