import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import reportWebVitals from './reportWebVitals';

// Ensure the 'root' element exists and is correctly typed as HTMLElement
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(

      <App />

  );

  // Log web vitals (optional, based on your preference)
  reportWebVitals();
} 

