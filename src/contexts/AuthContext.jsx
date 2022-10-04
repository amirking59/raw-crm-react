import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          // const response = await axios.get('/api/account/my-account');
          // const { user } = response.data;

          const user = {
            id: 'test',
            name: 'amir hossein',
            email: 'test@gmail.com',
          };

          setTimeout(() => {
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user,
              },
            });
          }, 3000);
        } else {
          setTimeout(() => {
            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: false,
                user: null,
              },
            });
          }, 3000);
        }
      } catch (err) {
        console.error(err);
        setTimeout(() => {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }, 3000);
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    // const response = await axios.post('/api/account/login', {
    //   email,
    //   password,
    // });
    // const { accessToken, user } = response.data;

    // remove it
    const user = {
      id: 'test',
      name: 'amir hossein',
      email: 'test@gmail.com',
    };
    const accessToken = 'testToken';
    //

    setSession(accessToken);
    setTimeout(() => {
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
    }, 2000);
  };

  const register = async (email, password, firstName, lastName) => {
    // const response = await axios.post('/api/account/register', {
    //   email,
    //   password,
    //   firstName,
    //   lastName,
    // });
    // const { accessToken, user } = response.data;

    // remove it
    const user = {
      id: 'test',
      name: 'amir hossein',
      email: 'test@gmail.com',
    };
    const accessToken = 'testToken';
    //

    window.localStorage.setItem('accessToken', accessToken);

    setTimeout(() => {
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
    }, 2000);
  };

  const logout = async () => {
    setSession(null);
    setTimeout(() => {
      dispatch({ type: 'LOGOUT' });
    }, 1000);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
