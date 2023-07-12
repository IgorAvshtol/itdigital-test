import React from 'react';
import styles from 'styles/App.module.css';
import { SearchBox } from './components/SearchBox';
import { Sidebar } from './components/Sidebar';
import { Workspace } from './components/Workspace';
import { ProvideApp } from './hooks/useProvide';

function App() {
  return (
    <ProvideApp>
      <SearchBox />
      <div className={styles.mainBlock}>
        <Sidebar />
        <Workspace />
      </div>
    </ProvideApp>
  );
}

export default App;
