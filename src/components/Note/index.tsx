import styles from 'styles/Note.module.css';
import { dateParser } from 'utils/dateParser';
import { useAppContext } from 'hooks/useProvide';

interface NoteProps {
  id: string;
  text: string;
  createdAt: string;
}

export function Note({ text, createdAt, id }: NoteProps) {
  const { showNote, currentNote, showEditModeForCurrentNote } = useAppContext();

  const onNoteClickHandler = () => {
    showNote(id);
    showEditModeForCurrentNote(false);
  };

  return (
    <button className={currentNote?.id === id ? styles.activeNote : styles.noteContainer} onClick={onNoteClickHandler}>
      <div className={styles.previewBlock}>
        <p>{dateParser(createdAt)}</p>
        <p className={styles.previewDescription}>{text}</p>
      </div>
    </button>
  );
}
