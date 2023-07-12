import styles from 'styles/SearchBox.module.css';
import { BiPlusMedical } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { PiNotePencil } from 'react-icons/pi';
import { Button } from '../Button';

export function SearchBox() {
  return (
    <div className={styles.searchBoxBlock}>
      <div className={styles.buttonsBlock}>
        <Button><BiPlusMedical /></Button>
        <Button><RiDeleteBinLine /></Button>
        <Button><PiNotePencil /></Button>
      </div>
      <input type='text' className={styles.inputBlock} />
    </div>
  );
}
