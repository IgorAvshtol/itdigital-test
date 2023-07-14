import styles from 'styles/Modal.module.css';
import { useAppContext } from 'hooks/useProvide';
import { Button } from '../Button';

export function Modal() {
  const { showDeleteModal, deleteCurrentNote } = useAppContext();

  const onOkBtnClick = () => {
    deleteCurrentNote();
  };

  const onNoBtnClick = () => {
    showDeleteModal(false);
  };

  return (
    <div className={styles.drawer}>
      <div className={styles.mainBlock}>
        <div className={styles.headerBlock}>
          <p className={styles.title}>Do you really want to delete?</p>
        </div>
        <div className={styles.buttonsBlock}>
          <Button onClick={onOkBtnClick}>Yes</Button>
          <Button onClick={onNoBtnClick}>No</Button>
        </div>
      </div>
    </div>
  );
}
