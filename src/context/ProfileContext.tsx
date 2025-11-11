import React, { createContext, useState, useContext } from 'react';

type ProfileContextType = {
  name: string;
  avatar: string;
  updateProfile: (newName: string, newAvatar: string) => void;
};

const ProfileContext = createContext<ProfileContextType>({
  name: 'Tamu',
  avatar: '',
  updateProfile: () => {},
});

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [name, setName] = useState('Tamu');
  const [avatar, setAvatar] = useState(
    ''
  );

  const updateProfile = (newName: string, newAvatar: string) => {
    setName(newName);
    setAvatar(newAvatar);
  };

  return (
    <ProfileContext.Provider value={{ name, avatar, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
