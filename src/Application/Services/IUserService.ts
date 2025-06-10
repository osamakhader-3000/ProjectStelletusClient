import {User} from '../../Domain/Entities/User'

export interface IUserService{
    GetUserById(id: string): Promise<User>;
}