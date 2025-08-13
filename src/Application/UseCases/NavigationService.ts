import { INavigationService } from "../Services/INavigationService";
import { INavigationStorage } from "../../Data/LocalData/Interfaces/INavigationStorage";

export class NavigationService implements INavigationService{

    navigationStorage:INavigationStorage;

    constructor(navigationStorage:INavigationStorage){
        this.navigationStorage = navigationStorage;
    }

    GetRedirectUrl(): string {
       return this.navigationStorage.GetRedirect();
    }

    SetRedirectUrl(url: string): void {
        this.navigationStorage.SetRedirect(url);
    }

    DeleteRedirectUrl(): void {
        this.navigationStorage.DeleteRedirect();
    }

}