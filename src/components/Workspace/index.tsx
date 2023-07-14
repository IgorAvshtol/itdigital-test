import React, { useEffect, useState } from 'react';
import { useAppContext } from 'hooks/useProvide';
import styles from 'styles/Workspace.module.css';

function Workspace() {
  const { currentNote, editMode, editNote } = useAppContext();
  const [noteText, setNoteText] = useState<string>('');

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.currentTarget.value);
  };

  useEffect(() => {
    if (currentNote) {
      setNoteText(Object.values(currentNote.values)[0]);
    }
  }, [currentNote]);

  useEffect(() => {
    if (currentNote) {
      editNote(noteText, currentNote?.id);
    }
  }, [noteText]);

  return (
    <div className={styles.workspaceContainer}>
      {currentNote && !editMode && <p>{Object.values(currentNote.values)[0]}</p>}
      {editMode
          && (
          <textarea
            className={styles.textareaBlock}
            value={noteText}
            onChange={(e) => onChangeInput(e)}
          />
          )}
    </div>
  );
}

export default React.memo(Workspace);
