import { INavigationStorage } from "../Interfaces/INavigationStorage";

export class NavigationStorage implements INavigationStorage{
    GetRedirect(): string {
        return NavigateStore.redirectTo as string;
    }
    
    SetRedirect(url: string): void {
        NavigateStore.redirectTo = url;
    }

    DeleteRedirect(): void {
        NavigateStore.redirectTo = null
    }    

}



const NavigateStore = {
  redirectTo: null,
  userPreferences: null,
  pendingInvitationId: null,
} as {
  redirectTo: string | null;
  userPreferences: any;
  pendingInvitationId: string | null;
};
