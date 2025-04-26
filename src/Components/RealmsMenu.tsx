import React, { useState, useEffect } from 'react';
import ListRealms from '../../APIsManagers/RealmsManager';
import RealmsMenuItem from './RealmsMenuItem';
import { BasicTextBox } from 'project-manager-client-component-library';
import Realm from '../../DataTransferObjects/Realm';

export default function RealmsMenu() {
  const [_realmname, setRealmName] = useState('');
  const [realms, setData] = useState<Realm[]>([]);  // Added type annotation

  useEffect(() => {
    const fetchData = async () => {
      const _realms = await ListRealms(_realmname);
      setData(_realms);
    };

    fetchData();
  }, [_realmname]);

  function RealmSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    setRealmName((event.target as HTMLInputElement).value);
  }

  const handleMouseEnter = (event: React.MouseEvent<HTMLTableRowElement>) => {
    event.currentTarget.className = 'realmsmenuelement realmSelectHover';
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLTableRowElement>) => {
    event.currentTarget.className = 'realmsmenuelement';
  };

  return (
    <div>
      <div className="homebutton">        
          <a tabIndex={0} href="/" className="homebuttonlink">
          <h3 className="realmsmenusearchlogofont">Stelletus</h3>
        </a>
      </div>
      <div className="realmsmenusearch">
        <BasicTextBox placeholder="Search" keyUpFunc={RealmSearch} />
      </div>
      <div className="realmsmenucontainer">
        <table className="realmsmenutable">
          <tbody>
            <tr
              className={'realmsmenuelement'}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <td>
                <RealmsMenuItem ID="mytasks" Name="mytasks" />
              </td>
            </tr>
            {realms.length > 0 &&
              realms.map((realm: Realm) => (
                <tr key={realm.id} className={'realmsmenuelement'} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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