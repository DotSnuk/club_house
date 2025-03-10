import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

const ActiveUser = createContext(null);

export function UserContext({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // might need to use something to set admin?

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/api/auth/status', {
          withCredentials: true,
        });
        if (response.data.isAuthenticated) {
          setUser(response.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const logout = async () => {
    console.log('inside logout');
    try {
      console.log('logging out');
      setLoading(true);
      await axios.post('/api/logout', { withCredentials: true });
      setUser(null);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <ActiveUser.Provider
      value={{ user, setUser, logout, loading, isAuthenticated }}
    >
      {children}
    </ActiveUser.Provider>
  );
}

export function useActiveUser() {
  return useContext(ActiveUser);
}
