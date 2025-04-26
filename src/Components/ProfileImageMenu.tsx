import ListProfileImageMenu from '../../APIsManagers/ProfileImageMenuManager'
import { useAuth } from './AuthContext';
import { useNavigate } from "react-router";
import { useState } from 'react';
import './ProfileImageMenu.css';

export default function ProfileImageMenu(){
    var imageMenuItems = ListProfileImageMenu();
    const navigate = useNavigate();
    const { logoutFunc } = useAuth();

  const [menuVisible, setMenuVisible] = useState<boolean>(false);  

    function menuItemClick(linkRef:string){
        if(linkRef == "/logout")
            logoutFunc();
        else
            navigate(linkRef);
    }

    function toggleList() {
       setMenuVisible(!menuVisible);     
    }

    return(
      <div className='profileimagemenu'>
      <button type='button' onClick={toggleList} className='userbuttonclass'>
            <img src="/1547564589747.jfif" className='userimgclass' alt=''></img>
        </button>
     <div className={menuVisible?'profileimagemenu menu':'profileimagemenu menu hide'}>
      {imageMenuItems.map((menuItem)=>( 
         <a onClick={()=>menuItemClick(menuItem.LinkRef)}>
          <div>
            {menuItem.Text}
          </div>
         </a>
       ))}            
    </div>
   </div>
    )
}

