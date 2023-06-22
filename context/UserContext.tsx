'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import apiClient from '@/utils/APIClient';

export interface User {
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
  loading: boolean; // <- Add a loading state
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      let userData = null;
      const userCookie = Cookies.get('user');

      if (userCookie) {
        userData = JSON.parse(userCookie);
      }
      
      const token = Cookies.get('access_token');

      if (token) {
        try {
          if (!userData) {
            userData = await apiClient.fetchUser(token);
            Cookies.set('user', JSON.stringify(userData));  // Saving user in cookie
          }
          setUser(userData);
        } catch (error) {
          const axiosError = error as AxiosError; // <-- cast error to AxiosError
          if (axiosError.response?.status === 401) {  // If HTTP status code is 401
            Cookies.remove('access_token');
            Cookies.remove('user');
            setUser(null);
            window.location.href = '/login';  // Redirect to login
          }
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(UserContext);

  // if (!context) {
  //     throw new Error('useUser must be used within a UserProvider');
  // }

  return context; // This will return both `user`, `loading` and `setUser`
};
