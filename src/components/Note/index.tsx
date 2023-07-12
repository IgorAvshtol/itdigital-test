import styles from 'styles/Note.module.css';
import { dateParser } from 'utils/dateParser';
import { useAppContext } from 'hooks/useProvide';

interface NoteProps {
  id: string;
  text: string;
  createdAt: string;
}

export function Note({ text, createdAt, id }: NoteProps) {
  const { showNote } = useAppContext();

  const onNoteClickHandler = () => {
    showNote(id);
  };

  return (
    <button className={styles.noteContainer} onClick={onNoteClickHandler}>
      <div className={styles.previewBlock}>
        <p>{dateParser(createdAt)}</p>
        <p className={styles.previewDescription}>{text}</p>
      </div>
    </button>
  );
}
