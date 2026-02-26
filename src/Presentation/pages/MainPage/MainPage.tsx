import { useState, useEffect } from 'react';
import StatusesPage from '../../Components/StatusPage.tsx'
import { Routes, Route, Navigate } from 'react-router';
import RealmsMenu from '../../Components/RealmsMenu.tsx'
import TasksPage from '../../Components/TasksPage.tsx';
import MainViewHeader from '../../Components/MainViewHeader.tsx';
import TaskFormWrapper from '../../Components/TaskFromWrapper.tsx';
import Realm from '../../../Domain/Entities/Realm.ts';
import styles from './MainPage.module.css'
import { useListRealmsByName } from '../../Hooks/useListRealmsByName.tsx';
import TestSecurity from '../../Components/TestSecurity.tsx';

 function MainPage() {
  const [realms, setRealms] = useState<Realm[]>([]);
  const listRealms = useListRealmsByName();
  
  useEffect(() => {
    const fetchData = async () => {
    
      
      const { realms: _realms, errorMessage: _err } = await listRealms('');
      setRealms(_realms);
      
    }
  
    fetchData();  


  }, []);

  return (
    <div>
      <header>
       
    
      <table className={styles.maintable}>
        <tbody>     
        <tr>
          <td className={styles.realmsmenucontainer}>
            <RealmsMenu/>
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
            <Route path="/" element={<Navigate to="/mytasks" replace />} />
            <Route path="/mytasks" element={<TasksPage/>} />
            <Route path="/test" element={<TestSecurity />} />
            {realms.map((realm, index) => (
              
                <Route key={index} path={'/'+realm.id} element={<StatusesPage realmid={realm.id}/>} />
              ))}
              <Route path="/task/:taskid" element={<TaskFormWrapper />} />
              
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
