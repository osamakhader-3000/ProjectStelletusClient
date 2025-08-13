import { INavigationStorage } from "../Interfaces/INavigationStorage";

export class NavigationStorage implements INavigationStorage{
    GetRedirect(): string {
        return localStorage.getItem('redirect')??'';
    }
    
    SetRedirect(url: string): void {
        localStorage.setItem('redirect',url);
    }

    DeleteRedirect(): void {
        localStorage.removeItem('redirect');
    }

}