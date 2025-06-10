import {User} from '../../../Domain/Entities/User'

export interface IUserApi{
    ListUsers():Promise<User[]>;
}