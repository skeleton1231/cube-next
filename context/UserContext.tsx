'use client'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import apiClient from '@/utils/APIClient';
import { clearAllCookies } from '@/utils/Cookie';
import Utils from '@/utils/utils';


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
  logout: () => Promise<void>; // <- Add this line here
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await apiClient.logoutUser(user); // 调用ApiClient的logoutUser方法
      setUser(null); // 清除用户信息
      clearAllCookies();

      toast.success('Successfully logged out!', {
        position: toast.POSITION.TOP_CENTER,
        onClose: () => {
          Utils.redirectTo("/signin", 6000); // Redirect after the toast is dismissed
        }
      });
    } catch (error) {
      console.error('An error occurred during logout:', error);
      // 可能会设置一个错误状态来显示错误消息
    }
  };

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
            setUser(null);
            clearAllCookies();
            toast.error('Authentication Fail!', {
              position: toast.POSITION.TOP_CENTER,
              onClose: () => {
                Utils.redirectTo("/", 6000); // Redirect after the toast is dismissed
              }
            });
          }
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);


  return (
    <UserContext.Provider value={{ user, loading, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )
};


export const useUser = () => {
  const context = useContext(UserContext);

  // if (!context) {
  //     throw new Error('useUser must be used within a UserProvider');
  // }

  return context; // This will return both `user`, `loading` and `setUser`
};
