import styles from './ErrorMessageBox.module.css';
import PopupBackground from '../PopupBackground';

interface ErrorMessageBoxProps {
  message:string|undefined;
  showError:boolean;
  setShowError: (value: boolean) =>void;
}

export function ErrorMessageBox({message,showError, setShowError }: ErrorMessageBoxProps) {

  function backGroundClicked() {

    setShowError(false);
  }

  return (
    <>
      { showError && <PopupBackground onClick={backGroundClicked}></PopupBackground>}
      <div className={`${styles.outerdiv} ${styles.fadein} ${ showError ? styles.show : ''}`} >
        {message}
      </div>
    </>
  );
}