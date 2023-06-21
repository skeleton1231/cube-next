'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import apiClient from '@/utils/APIClient';

interface User {
  id: number;
  name: string;
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
  const [loading, setLoading] = useState(true);


  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      // Use the access token from the cookie
      const token = Cookies.get('access_token');

      if (token) {
        try {
          // Fetch user data using the API client
          const userData = await apiClient.fetchUser(token);
          console.log(userData)
          setUser(userData);
        } catch (error) {
          // Handle errors (e.g., token is invalid)
          console.error('Failed to fetch user:', error);
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
    throw new Error('useUser must be used within a UserProvider');
  }

  return context; // This will return both `user` and `setUser`
};
