import urls from '../api/urls.json'
import { INavigationStorage } from '../LocalData/Interfaces/INavigationStorage';
import { INavigationRepository } from '../../Application/Repositories/INavigationRepository';


export class NavigationRepository implements INavigationRepository{ 

    private baseUrl:string;
    private _navigationStorage:INavigationStorage;


    constructor(navigationStorage: INavigationStorage){
        this.baseUrl =  urls["security-app-domain"];
        this._navigationStorage = navigationStorage;
    }
    
    GetMicrosoftLoginUrl():string{
       return `${this.baseUrl}/${urls['microsoft-login']}`;
    }

    GetRedirect(): string {
        return this._navigationStorage.GetRedirect();
    }

    SetRedirect(url: string): void {
        this._navigationStorage.SetRedirect(url);
    }

    DeleteRedirect(): void {
        this._navigationStorage.DeleteRedirect();
    }    
}