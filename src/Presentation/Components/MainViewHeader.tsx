import  SearchBox  from "./GeneralComponents/SearchBox";
import ProfileImageMenu from './ProfileImageMenu';
import styles from './MainViewHeader.module.css'

export default function MainViewHeader(){
   

    return (
    <div className={styles.mainviewheader}>
      <div className={styles.searchDiv}>
        <SearchBox innerDivStyle={styles.innerDivStyle} innerDivStyleActive={styles.innerDivStyleActive} placeholder='Search tickets'></SearchBox>
      </div>
      <ProfileImageMenu></ProfileImageMenu>
    </div>);
}