import React from 'react';
import styles from 'styles/SearchBox.module.css';
import { useAppContext } from 'hooks/useProvide';
import { BiPlusMedical } from 'react-icons/bi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { PiNotePencil } from 'react-icons/pi';
import { Button } from '../Button';

interface SearchBoxProps {
  desireValue: string;
  setDesireValue: (noteName: string) => void;
}

export function SearchBox({ setDesireValue, desireValue }: SearchBoxProps) {
  const {
    createNote, showEditModeForCurrentNote, showDeleteModal, currentNote,
  } = useAppContext();

  const onAddBtnClick = () => {
    createNote('New note');
  };

  const onEditBtnClick = () => {
    showEditModeForCurrentNote(true);
  };

  const onDeleteBtnClick = () => {
    showDeleteModal(true);
  };

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesireValue(e.currentTarget.value);
  };

  return (
    <div className={styles.searchBoxBlock}>
      <div className={styles.buttonsBlock}>
        <Button onClick={onAddBtnClick}><BiPlusMedical /></Button>
        <Button onClick={onDeleteBtnClick} disable={!currentNote}><RiDeleteBinLine /></Button>
        <Button onClick={onEditBtnClick} disable={!currentNote}><PiNotePencil /></Button>
      </div>
      <input
        type='text'
        placeholder='Search note'
        value={desireValue}
        onChange={onSearchInputChange}
        className={styles.inputBlock}
      />
    </div>
  );
}
