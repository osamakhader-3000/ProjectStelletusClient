import { createContext } from 'react';
import { RealmRepository } from '../Data/Repositories/RealmRepository';
import { RealmApi } from '../Data/api/Implementation/RealmApi';
import {RealmService} from '../Application/UseCases/RealmService';
import { TaskService } from '../Application/UseCases/TaskService';
import { TaskRepository } from '../Data/Repositories/TaskRepository';
import { TaskApi } from '../Data/api/Implementation/TaskApi';
import { StatusApi } from '../Data/api/Implementation/StatusApi';
import { StatusService } from '../Application/UseCases/StatusService';
import { StatusRepository } from '../Data/Repositories/StatusRepository';
import { ProfileImageMenuService } from '../Application/UseCases/ProfileImageMenuService';
import { ProfileImageMenuRepository } from '../Data/Repositories/ProfileImageMenuRepository';
import { AuthService } from '../Application/UseCases/AuthService';
import { AuthApi } from '../Data/api/Implementation/AuthApi';
import { AuthRepository } from '../Data/Repositories/AuthRepository';
import { AuthStorage } from '../Data/LocalData/Implemetation/AuthStorage';
import { IAuthService } from '../Application/Services/IAuthService';
import { IStatusService } from '../Application/Services/IStatusService';
import { ITaskService } from '../Application/Services/ITaskService';
import { IProfileImageMenuService } from '../Application/Services/IProfileImageMenuService';
import { IRealmService } from '../Application/Services/IRealmService';
import { INavigationService } from '../Application/Services/INavigationService';
import { NavigationService } from '../Application/UseCases/NavigationService';
import { NavigationStorage } from '../Data/LocalData/Implemetation/NavigationStorage';

const realmapi = new RealmApi();
const realmRepo = new RealmRepository(realmapi);
const realmServ = new RealmService(realmRepo);
const profImgMenuRepo = new ProfileImageMenuRepository();
const profileImgMenuServ = new ProfileImageMenuService(profImgMenuRepo);
const taskapi = new TaskApi();
const taskRepo = new TaskRepository(taskapi);
const taskServ = new TaskService(taskRepo);
const statusapi = new StatusApi();
const statusRepo = new StatusRepository(statusapi);
const statusServ = new StatusService(statusRepo);
const authApi = new AuthApi();
const authStorage = new AuthStorage();
const authRepository = new AuthRepository(authApi,authStorage);
const authServ = new AuthService(authRepository);
const navigateStore = new NavigationStorage();
const navigateServ = new NavigationService(navigateStore);


// Define the context interface
interface DependencyContextType {
  realmService: IRealmService;
  profileImgMenuService: IProfileImageMenuService;
  taskService: ITaskService;
  statusService: IStatusService;
  authService: IAuthService;
  navigationService:INavigationService;
}

export const DependencyContext = createContext<DependencyContextType>({
  realmService: realmServ,
  profileImgMenuService:profileImgMenuServ,
  taskService:taskServ,
  statusService:statusServ,
  authService:authServ,
  navigationService:navigateServ
});

export const DependencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <DependencyContext.Provider value={{ realmService: realmServ,profileImgMenuService:profileImgMenuServ,taskService:taskServ,statusService:statusServ ,authService:authServ,navigationService:navigateServ}}>
    {children}
  </DependencyContext.Provider>
);
