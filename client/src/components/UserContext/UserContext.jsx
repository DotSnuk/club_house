import { createContext, useState, useContext } from 'react';

const ActiveUser = createContext(null);

export function UserContext({ children }) {
  const [user, setUser] = useState({ user: null });
  // might need to use something to set admin?

  return (
    <ActiveUser.Provider value={{ user, setUser }}>
      {children}
    </ActiveUser.Provider>
  );
}

export function useActiveUser() {
  return useContext(ActiveUser);
}
