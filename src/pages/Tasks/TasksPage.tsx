import { useState, useEffect } from 'react';
import StatusesPage from '../../Components/StatusPage.tsx'
import { Routes, Route } from 'react-router';
import RealmsMenu from '../../Components/RealmsMenu.tsx'
import ListRealms from '../../../APIsManagers/RealmsManager.ts'
import TasksPage from '../../Components/TasksPage.tsx';
import MainViewHeader from '../../Components/MainViewHeader.tsx';
import TaskFormWrapper from '../../Components/TaskFromWrapper.tsx';
import Realm  from '../../../DataTransferObjects/Realm.ts';

 function App() {
  const [realms, setRealms] = useState<Realm[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
    
      var _realms = await ListRealms('');  
      setRealms(_realms);
    }
  
    fetchData();  


  }, []);

  return (
    <div>
      <header>
       
    
      <table className='maintable'>
        <tbody>     
        <tr>
          <td className="css-334hm0">
            <RealmsMenu/>
          </td>

          <td className='mainlistcell'>
            <table className='mainviewtable'>
              <tbody>
              <tr>
                <td>
                  <MainViewHeader></MainViewHeader>
                </td>
              </tr> 
              <tr>
                <td>
          <Routes>
            <Route path="/realm/mytasks" element={<TasksPage/>} />
            {realms.map((realm, index) => (
              
                <Route key={index} path={'realm/'+realm.id} element={<StatusesPage realmid={realm.id}/>} />
              ))}
              <Route path="/realm/task/:taskid" element={<TaskFormWrapper />} />
              
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

export default App;
