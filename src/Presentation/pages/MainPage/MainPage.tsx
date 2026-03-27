import { Routes, Route, Navigate } from 'react-router';
import RealmsMenu from '../../Components/RealmsMenu.tsx'
import TasksPage from '../Tasks/TasksPage.tsx';
import MainViewHeader from '../../Components/MainViewHeader.tsx';
import AddTaskForm from '../../Components/AddTaskForm.tsx';
import styles from './MainPage.module.css'
import TestSecurity from '../../Components/TestSecurity.tsx';
import { EmailVerifiedRoute } from '../../Routes/EmailVerifiedRoute.tsx';
import { TempAccountRoute } from '../../Routes/TempAccountRoute.tsx';
import EmailUnverifiedMessage from '../auth/EmailUnverifiedMessage.tsx';
import Profile from '../User/Profile.tsx';
import Users from '../AdminPages/Users.tsx';
import { TempAccountMessage } from '../auth/TempAccountMessage.tsx';
import { AdminAccountRoute } from '../../Routes/AdminAccountRoute.tsx';
import EditTaskForm from '../../Components/EditTaskForm.tsx';
import { CubesBuildForm } from '../../Components/CubesBuild/CubesBuildForm.tsx';

function MainPage() {

  return (
    <div>
      <header>

        <table className={styles.maintable}>
          <tbody>
            <tr>
              <td className={styles.realmsmenucontainer}>
                <RealmsMenu />
              </td>

              <td className={styles.mainlistcell}>
                <table className={styles.mainviewtable}>
                  <tbody>
                    <tr>
                      <td>
                        <MainViewHeader></MainViewHeader>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Routes>
                          <Route path="/emailverification" element={<EmailUnverifiedMessage />} />
                          <Route path="/tempaccount" element={<TempAccountMessage />} />
                          <Route path="/" element={<Navigate to="/mytasks" replace />} />
                          <Route path="/test" element={<TestSecurity />} />
                          <Route element={<EmailVerifiedRoute />}>
                            <Route element={<TempAccountRoute />}>
                              <Route path="/mytasks" element={<TasksPage />} />
                              <Route element={<AdminAccountRoute />}>
                                <Route path="/users" element={<Users />} />
                              </Route>
                              <Route path="/myprofile" element={<Profile />} />
                              <Route path="/addtask" element={<AddTaskForm />} />
                              <Route path="/task/:id" element={<EditTaskForm />} />
                              <Route path="/cubesbuild" element={<CubesBuildForm />} />
                            </Route>
                          </Route>
                        </Routes>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>

            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default MainPage;
