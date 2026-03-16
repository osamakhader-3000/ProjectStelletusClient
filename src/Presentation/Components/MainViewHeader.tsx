import  SearchBox  from "./GeneralComponents/SearchBox";
import ProfileImageMenu from './ProfileImageMenu';
import styles from './MainViewHeader.module.css'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserEmailVerificationStatus } from "../../Domain/Entities/User";

export default function MainViewHeader(){
  
   const { currentUser } = useContext(AuthContext);

    return (
    <div className={styles.mainviewheader}>
      {currentUser && currentUser.emailVerificationStatus == UserEmailVerificationStatus.Verified && (
        <div className={styles.searchDiv}>
          <SearchBox
            innerDivStyle={styles.innerDivStyle}
            innerDivStyleActive={styles.innerDivStyleActive}
            placeholder="Search tickets"
          />
        </div>
      )}
      <div className={styles.profileButton}><ProfileImageMenu></ProfileImageMenu></div>
    </div>);
}