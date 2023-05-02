import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import IntentProvider from './contexts/IntentContext';
import AppProvider from './contexts/AppContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
      <IntentProvider>
        <App/>
      </IntentProvider>
    </AppProvider>
);

