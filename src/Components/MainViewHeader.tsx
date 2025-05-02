import  TextBox  from "./GeneralComponents/TextBox";
import ProfileImageMenu from './ProfileImageMenu';

export default function MainViewHeader(){
   

    return (
    <div className='mainviewheader'>
      <div className="mainviewheader searchDiv">
        <TextBox placeholder='Search'></TextBox>
      </div>
      <ProfileImageMenu></ProfileImageMenu>
    </div>);
}