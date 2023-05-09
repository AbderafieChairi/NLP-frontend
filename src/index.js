import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import IntentProvider from './contexts/IntentContext';
import ChatProvider from './contexts/ChatContext';
import FlowProvider from './contexts/FlowContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <IntentProvider>
        <FlowProvider>
          <ChatProvider>
            <App/>
          </ChatProvider>
        </FlowProvider>
      </IntentProvider>
);

