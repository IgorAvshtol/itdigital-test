import styles from 'styles/Workspace.module.css';
import { useAppContext } from 'hooks/useProvide';

export function Workspace() {
  const { currentNote } = useAppContext();

  return (
    <div className={styles.workspaceContainer}>
      {currentNote && Object.values(currentNote.values)[0]}
    </div>
  );
}
