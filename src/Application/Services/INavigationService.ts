export interface INavigationService{
    GetRedirectUrl():string;
    SetRedirectUrl(url:string):void;
    DeleteRedirectUrl():void;
    NavigateTo(url:string):void;
    NavigateToMicrosoftLogin():void;
}