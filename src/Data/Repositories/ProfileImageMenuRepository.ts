import ProfileImageMenuItem from "../../Application/DataTransferObjects/ProfileImageMenuItem";
import { IProfileImageMenu } from "../../Application/DataTransferInterfaces/IProfileImageMenu";


export class ProfileImageMenuRepository implements IProfileImageMenu{

     async ListProfileImageMenuItems(): Promise<ProfileImageMenuItem[]> {        
        const profileImageMenuItems: ProfileImageMenuItem[] = [];        
        const profileItem = new ProfileImageMenuItem(1, "Profile", "/profile");
        const logoutItem = new ProfileImageMenuItem(2, "Log out", "/logout");
        profileImageMenuItems.push(profileItem, logoutItem);        

        return Promise.resolve(profileImageMenuItems);
    }


}