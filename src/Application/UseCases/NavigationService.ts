import { INavigationService } from "../Services/INavigationService";
import { INavigationRepository } from "../Repositories/INavigationRepository";

export class NavigationService implements INavigationService{

    navigationRepository:INavigationRepository;

    constructor(navigationRepository:INavigationRepository){
        this.navigationRepository = navigationRepository;
    }

    GetRedirectUrl(): string {
       return this.navigationRepository.GetRedirect();
    }

    SetRedirectUrl(url: string): void {
        this.navigationRepository.SetRedirect(url);
    }

    DeleteRedirectUrl(): void {
        this.navigationRepository.DeleteRedirect();
    }

    NavigateTo(url: string): void {
        window.location.href = url;
    }

    NavigateToMicrosoftLogin(): void {
        this.NavigateTo(this.navigationRepository.GetMicrosoftLoginUrl());
    }

}