import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userID: string;
  userName: string;
  userAvatar: string;
  setUserName: (name: string) => void;
  setUserAvatar: (avatar: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children, userID }: { children: ReactNode; userID: string }) => {
  const [userName, setUserName] = useState(`User`);
  const [userAvatar, setUserAvatar] = useState(`https://i.pinimg.com/736x/0f/42/8e/0f428ed39d0165cad508628a0ad47e6b.jpg`);

  return (
    <UserContext.Provider value={{ userID, userName, userAvatar, setUserName, setUserAvatar }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
