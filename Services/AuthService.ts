import { User } from '../DataTransferObjects/User';

export class AuthService {
  isLoggedIn: boolean = false;
  user: User | null = null;
  logoutFunc: () => void = () => {};

  constructor(
    isLoggedIn: boolean,
    user: User | null,
    logoutFunc: () => void
  ) {
    this.isLoggedIn = isLoggedIn;
    this.user = user;
    this.logoutFunc = logoutFunc;
  }
}
