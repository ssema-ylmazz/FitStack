import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * FITSTACK - React Giriş Noktası
 * Bu dosya App.js bileşenini index.html içindeki 'root' div'ine bağlar.
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);