import React, { useState, useEffect } from 'react';
import RealmsMenuItem from './RealmsMenuItem';
import SearchBox  from './GeneralComponents/SearchBox';
import Realm from '../../Domain/Entities/Realm';
import styles from './RealmsMenu.module.css'
import { useListRealmsByName } from '../Hooks/useListRealmsByName';
import { ErrorMessageBox } from './GeneralComponents/ErrorMessageBox';

export default function RealmsMenu() {

  const listRealms = useListRealmsByName();
  const [_realmname, setRealmName] = useState('');
  const [realms, setData] = useState<Realm[]>([]); 
  const [err,setErr] = useState<string|undefined>(undefined);
  const [showError,setShowError] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const { realms: _realms, errorMessage: _err,showError } = await listRealms(_realmname);
      setData(_realms);
      setErr(_err);
      setShowError(showError);
    };

    fetchData();
  }, [_realmname]);

  function RealmSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    setRealmName((event.target as HTMLInputElement).value);    
  }

  
  return (
    <div>
      <div className={styles.homebutton}>        
          <a tabIndex={0} href="/" className={styles.homebuttonlink}>
          <h3 className={styles.realmsmenusearchlogofont}>Stelletus</h3>
        </a>
      </div>
      <div className={styles.realmsmenusearch}>
        <SearchBox placeholder="Search projects" keyUpFunc={RealmSearch} />
      </div>
      <div className={styles.realmsmenucontainer}>
        <table className={styles.realmsmenutable}>
          <tbody>
            <tr
              className={styles.realmsmenuelement}>
              <td>
                <RealmsMenuItem ID="mytasks" Name="mytasks" />
              </td>
            </tr>
            <tr>
              <td>
              </td>
              </tr>
            {realms.length > 0 &&
              realms.map((realm: Realm) => (
                <tr key={realm.id} className={styles.realmsmenuelement}>
                  <td>
                    <RealmsMenuItem ID={realm.id.toString()} Name={realm.name}/>
                    </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <ErrorMessageBox message={err} showError={showError} setShowError={setShowError}></ErrorMessageBox>
    </div>
  );
}