import { useEffect } from 'react';
import styles from 'styles/Sidebar.module.css';
import { useAppContext } from 'hooks/useProvide';
import { Note } from '../Note';

export function Sidebar() {
  const { notes, getAllNotes } = useAppContext();

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div className={styles.sideBar}>
      {
            notes.map((note) => (
              <Note key={note.id} text={Object.keys(note.values)[0]} createdAt={note.created_at} id={note.id} />
            ))
        }
    </div>
  );
}
