import React, { useState } from 'react';
import { Logout } from '../../APIsManagers/AuthApiManager';
import { useNavigate } from "react-router";
import { useAuth } from './AuthContext';

interface UsersListProps {
    onUserSelect: (userId: string) => void;
}

const UsersList:React.FC<UsersListProps> = ({onUserSelect}:UsersListProps) =>
{
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [tableStyle, setTableStyle] = useState<React.CSSProperties>({
        display:"none",
        position: "absolute",
        background: "aqua",
        zIndex:'1'
    });  

    

    function SelectUser(id:string)
    {
        onUserSelect(id);
    }

    function toggleList() {
        if (tableStyle.display === "none") {
            setTableStyle(prevStyle => ({ 
                ...prevStyle, 
                display: "" 
            }));
        } else {
            setTableStyle(prevStyle => ({ 
                ...prevStyle, 
                display: "none" 
            }));
        }
    }

    function logoutClicked(){
        debugger;
        Logout();
        logout(false);
        navigate('/login');
    }

    return (

        <>
        <button type='button' onClick={toggleList} className='userbuttonclass'>
            <img src="/1547564589747.jfif" className='userimgclass' alt=''></img>
        </button>
        <table style={tableStyle}>
            <tbody>
                {users.map((user,index)=>(
                <tr key={index}>
                    <td>
                        <button onClick={()=>SelectUser(user.ID)}>{user.Name}</button>
                        <p>{tableStyle.display}</p>
                    </td>
                </tr>
               ))}
            </tbody>
        </table>
        </>
    );
};
export default UsersList;