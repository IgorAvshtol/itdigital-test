import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ProvideApp } from 'hooks/useProvide';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <ProvideApp>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ProvideApp>,
);
