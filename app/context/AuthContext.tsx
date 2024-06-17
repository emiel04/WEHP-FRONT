import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { KEY_TOKEN } from "../config/config";
import { createError } from "../helper/requesthelper";
import { deleteItem, getItem, setItem } from "../helper/storage";
import axiosInstance from "../config/axios";
import { jwtDecode } from "jwt-decode";
interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister: (name: string, pin: string) => Promise<any>;
  onLogin: (name: string, pin: string) => Promise<any>;
  onLogout: () => Promise<any>;
}
interface AuthState {
  token: string | null;
  authenticated: boolean | null;
}

const AuthContext = createContext<AuthProps>({
  onLogin(name: string, pin: string): Promise<any> {
    return Promise.resolve(undefined);
  },
  onLogout(): Promise<any> {
    return Promise.resolve(undefined);
  },
  onRegister(name: string, pin: string): Promise<any> {
    return Promise.resolve(undefined);
  },
});

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = await getItem(KEY_TOKEN);
      if (token) {
        setAuthState({
          token,
          authenticated: true,
        });
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${token}`;
      } else {
        setAuthState({
          token: null,
          authenticated: false,
        });
      }
    };
    checkToken().then();
  }, []);

  const onRegister = async (name: string, pin: string) => {
    try {
      const response = await axiosInstance.post(`/signup`, {
        name,
        pin,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  };
  const onLogin = async (name: string, pin: string) => {
    try {
      const response = await axiosInstance.post(`/login`, {
        name,
        pin,
      });
      // await SecureStore.setItemAsync(KEY_TOKEN, response.data.token);
      await setItem(KEY_TOKEN, response.data.token);
      setAuthState({
        token: response.data.token,
        authenticated: true,
      });

      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${response.data.token}`;

      return response.data;
    } catch (error) {
      return createError(error);
    }
  };
  const onLogout = async () => {
    try {
      // await SecureStore.deleteItemAsync("token");
      await deleteItem(KEY_TOKEN);
      axiosInstance.defaults.headers.common["Authorization"] = ``;
      setAuthState({
        token: null,
        authenticated: false,
      });
      return;
    } catch (error) {
      return error;
    }
  };

  const value = useMemo(() => {
    return {
      authState,
      onRegister,
      onLogin,
      onLogout,
    };
  }, [authState]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
