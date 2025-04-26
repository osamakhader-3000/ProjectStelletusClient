import ProfileImageMenuItem from '../DataTransferObjects/ProfileImageMenuItem'

export default function ListProfileImageMenu(): ProfileImageMenuItem[] 
{
    var profileImageMenuItems: ProfileImageMenuItem[] = [];
    var profileItem = new ProfileImageMenuItem(1,"Profile","/profile");
    var logoutitem = new ProfileImageMenuItem(2,"Log out","/logout");
    profileImageMenuItems.push(profileItem);
    profileImageMenuItems.push(logoutitem);
    return profileImageMenuItems;
}