import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './routes/index.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

import { ProgressBarStyle } from './components/ProgressBar.jsx';

import './assets/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProgressBarStyle />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
