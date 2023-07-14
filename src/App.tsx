import React, { useState } from 'react';
import styles from 'styles/App.module.css';
import { createPortal } from 'react-dom';
import { useAppContext } from './hooks/useProvide';
import { SearchBox } from './components/SearchBox';
import { Sidebar } from './components/Sidebar';
import { Modal } from './components/Modal';
import Workspace from './components/Workspace';

function App() {
  const { showModal } = useAppContext();
  const [desireValue, setDesireValue] = useState<string>('');

  return (
    <>
      <SearchBox desireValue={desireValue} setDesireValue={setDesireValue} />
      <div className={styles.mainBlock}>
        <Sidebar desireValue={desireValue} />
        <Workspace />
      </div>
      {
        showModal
          && createPortal(
            <Modal />,
            document.body,
          )
      }
    </>
  );
}

export default App;
