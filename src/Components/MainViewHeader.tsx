import { BasicTextBox } from "project-manager-client-component-library";
import ProfileImageMenu from './ProfileImageMenu';

export default function MainViewHeader(){
   
    return (
    <div className='mainviewheader'>
      <div className="mainviewheader searchDiv">
        <BasicTextBox placeholder='Search'></BasicTextBox>
      </div>
      <ProfileImageMenu></ProfileImageMenu>
    </div>);
}