import {createContext, useContext, useMemo, useState} from "react";
import axios, {AxiosError} from "axios";
import * as SecureStore from "expo-secure-store";
import {API_URL, KEY_TOKEN} from "../config/config";
import {createError} from "../helper/requesthelper";
interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null};
  onRegister?: (name: string, pin: string) => Promise<any>;
  onLogin?: (name: string, pin: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}
interface AuthState {
    token: string | null;
    authenticated: boolean | null;
}


const AuthContext = createContext<AuthProps>({});

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState]
      = useState<AuthState>({token: null, authenticated: null});
  const onRegister = async (name: string, pin: string) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
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
      const response = await axios.post(`${API_URL}/login`, {
        name,
        pin,
      });
      await SecureStore.setItemAsync(KEY_TOKEN, response.data.token);

      setAuthState({
        token: response.data.token,
        authenticated: true,
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      return response.data;
    } catch (error) {
      return createError(error);

    }
  };
  const onLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      axios.defaults.headers.common["Authorization"] = ``;
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
  }, [authState])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
