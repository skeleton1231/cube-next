'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import apiClient from '@/utils/APIClient';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserContextProps {
  children: ReactNode;
}

interface UserContextValue {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      // Use the access token from the cookie
      const token = Cookies.get('access_token');

      if (token) {
        try {
          // Fetch user data using the API client
          const userData = await apiClient.fetchUser(token);
          setUser(userData);
        } catch (error) {
          // Handle errors (e.g., token is invalid)
          Cookies.remove('access_token'); // Remove invalid token
          setUser(null);
        }
      }
    };

    fetchUser();
  }, []); // Empty dependency array means this effect only runs once on mount

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
      return null
  }

  return context; // This will return both `user` and `setUser`
};
