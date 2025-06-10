import  TextBox  from "./GeneralComponents/TextBox";
import ProfileImageMenu from './ProfileImageMenu';
import styles from './MainViewHeader.module.css'

export default function MainViewHeader(){
   

    return (
    <div className={styles.mainviewheader}>
      <div className={styles.searchDiv}>
        <TextBox placeholder='Search'></TextBox>
      </div>
      <ProfileImageMenu></ProfileImageMenu>
    </div>);
}