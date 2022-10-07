import { Suspense, lazy } from 'react';
import { createBrowserRouter, useLocation } from 'react-router-dom';

// guards
import GuestGuard from '../guards/GuestGuard.jsx';

// components
import LoadingScreen from '../components/LoadingScreen.jsx';
import AuthGuard from '../guards/AuthGuard.jsx';

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

// routes
const Login = Loadable(lazy(() => import('../pages/auth/Login.jsx')));
const Page404 = Loadable(lazy(() => import('../pages/Page404.jsx')));
const App = Loadable(lazy(() => import('../App.jsx')));

export default createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthGuard>
        <App />
      </AuthGuard>
    ),
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
