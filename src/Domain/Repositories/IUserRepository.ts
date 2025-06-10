import { User } from '../Entities/User';

export interface IUserRepository {
  GetUserById(id: string): Promise<User>;
}