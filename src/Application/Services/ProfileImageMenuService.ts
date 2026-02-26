import ProfileImageMenuItem from "../DataTransferObjects/ProfileImageMenuItem";
import { IProfileImageMenuService } from "../Interfaces/IProfileImageMenuService";
import {IProfileImageMenu} from "../DataTransferInterfaces/IProfileImageMenu";

export class ProfileImageMenuService implements IProfileImageMenuService{

    profileImageMenu:IProfileImageMenu;

    constructor(profileImageMenu:IProfileImageMenu){
        this.profileImageMenu=profileImageMenu;
    }

    async ListProfileImageMenuItems(): Promise<ProfileImageMenuItem[]> {
        return this.profileImageMenu.ListProfileImageMenuItems();
    }

}