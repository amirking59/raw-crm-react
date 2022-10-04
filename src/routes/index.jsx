import { createBrowserRouter } from 'react-router-dom';

// guards
import GuestGuard from '../guards/GuestGuard.jsx';

// routes
import App from '../App.jsx';
import Page404 from '../pages/Page404.jsx';
import Login from '../pages/auth/Login.jsx';

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);
