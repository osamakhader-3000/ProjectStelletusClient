import ProfileImageMenuItem from "../../Application/DataTransferObjects/ProfileImageMenuItem";
import { IProfileImageMenu } from "../../Application/DataTransferInterfaces/IProfileImageMenu";
import { User, UserAccountStatus, UserEmailVerificationStatus } from "../../Domain/Entities/User";


export class ProfileImageMenuRepository implements IProfileImageMenu{

     async ListProfileImageMenuItems(user:User): Promise<ProfileImageMenuItem[]> { 

        const profileImageMenuItems: ProfileImageMenuItem[] = [];        
        if(user != null && user.emailVerificationStatus == UserEmailVerificationStatus.Verified && user.accountStatus == UserAccountStatus.Active)
            profileImageMenuItems.push(new ProfileImageMenuItem(1, "My Profile", "/myprofile"));

        profileImageMenuItems.push(new ProfileImageMenuItem(2, "Log out", "/logout"));

        return Promise.resolve(profileImageMenuItems);
    }


}