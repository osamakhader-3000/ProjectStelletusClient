import { useState } from 'react';
import { Link } from "react-router";

interface RealmsMenuItemProps{
  ID:string,
  Name:string
}

export default function RealmsMenuItem({ID,Name}:RealmsMenuItemProps){
    const [realmsmenuelementclass, setRealmsmenuelementclass] = useState('realmsmenuelement');
    const realmMouseEnter = ()=>{
        setRealmsmenuelementclass('realmsmenuelement realmSelectHover');
      }
  
      const realmMouseLeave = ()=>{
        setRealmsmenuelementclass('realmsmenuelement');
      }
      

return(
<div className={realmsmenuelementclass} onMouseEnter={realmMouseEnter} onMouseLeave={realmMouseLeave}>
    <Link to={'/realm/'+ID}  className='realmsmenurelmlink'>
            <div>
                <div className='realmsmenurealmimg'>
                  <img src="/realmicon.svg" alt=''></img>                    
                    </div>
                <div className='realmsmenurealmtext'>
                  <span className='realmsmenurealmtextspan'>{Name}</span> 
                </div>
            </div>              
    </Link>            
</div>
);
}