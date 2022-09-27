import { createBrowserRouter } from 'react-router-dom';

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
    element: <Login />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);
