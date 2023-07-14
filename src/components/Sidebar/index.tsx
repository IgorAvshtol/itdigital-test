import { useEffect, useMemo } from 'react';
import { useAppContext } from 'hooks/useProvide';
import styles from 'styles/Sidebar.module.css';
import { Note } from '../Note';

interface SidebarProps {
  desireValue: string;
}

export function Sidebar({ desireValue }: SidebarProps) {
  const {
    notes, getAllNotes, loading, error,
  } = useAppContext();

  useEffect(() => {
    getAllNotes();
  }, []);

  const filteredNotes = useMemo(
    () => notes.filter((note) => Object.values(note.values)[0].includes(desireValue)),
    [notes, desireValue],
  );

  if (loading) return <p>Loading...</p>;
  if (error) alert(error);

  return (
    <div className={styles.sideBar}>
      {
        filteredNotes.map((note) => (
          <Note key={note.id} text={Object.values(note.values)[0]} createdAt={note.created_at} id={note.id} />
        ))
        }
    </div>
  );
}
