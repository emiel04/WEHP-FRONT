import React, { createContext, useContext, useState, useMemo } from "react";
import { User } from "../global";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const initialUser: User | null = null;
const UserContext = createContext<UserContextType>({
  user: initialUser,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: React.ReactNode; // Define children as ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initialUser);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
