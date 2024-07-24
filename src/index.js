

import React from 'react';
import ReactDOM from 'react-dom'; // Correct import

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Check if createRoot is supported
const root = ReactDOM.createRoot ? ReactDOM.createRoot(document.getElementById('root')) : ReactDOM.unstable_createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
