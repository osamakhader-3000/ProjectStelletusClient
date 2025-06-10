import ProfileImageMenuItem from "../DataTransferObjects/ProfileImageMenuItem";

export interface IProfileImageMenu {
    ListProfileImageMenuItems(): Promise<ProfileImageMenuItem[]>;
}