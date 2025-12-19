export interface IAuthStorage{
    SetLoginExpireTime(expireTime: Date): void;
    GetLoginExpireTime(): Date | null;
}