import React, { useState, useEffect,useContext } from 'react';
import RealmsMenuItem from './RealmsMenuItem';
import TextBox  from './GeneralComponents/TextBox';
import Realm from '../../Domain/Entities/Realm';
import styles from './RealmsMenu.module.css'
import { DependencyContext } from '../../context/DependencyContext';

export default function RealmsMenu() {

const { realmService } = useContext(DependencyContext);

  const [_realmname, setRealmName] = useState('');
  const [realms, setData] = useState<Realm[]>([]); 
  useEffect(() => {
    const fetchData = async () => {
      const _realms = await realmService.listRealmsByName(_realmname);
      setData(_realms);
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
        <TextBox placeholder="Search" keyUpFunc={RealmSearch} />
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
            {realms.length > 0 &&
              realms.map((realm: Realm) => (
                <tr key={realm.id} className={styles.realmsmenuelement}>
                  <td>
                    <RealmsMenuItem ID={realm.id.toString()} Name={realm.name} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}