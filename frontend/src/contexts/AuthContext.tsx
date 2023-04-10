import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies"

import Router from "next/router";
import api from "@/services/api";

interface AuthData {
  name?: string;
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface AuthContextTypes {
  user: User | null;
  signIn: (data: AuthData) => Promise<{ error: string; } | { error: null; }>
  register: (data: AuthData) => Promise<{ error: string; } | { error: null; }>
  logOut: () => Promise<{ error: string; } | { error: null; }>; 
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean
  created_at: string;
}

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextTypes);

export function AuthProvider({ children }: Props) {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { "session": token } = parseCookies()
    if (token) {
      recoveryUserInformation()
    }
  }, []);

  async function recoveryUserInformation() {
    const response = await api.get("/user");
    const userInfo = response.data.user
    setUser(userInfo)
  }
  
  async function register({ name, email, password }: AuthData) {
    try {
      await api.post("/users/register", { name, email, password });
      await signIn({ name, email, password }) 
      await recoveryUserInformation()
      return { error: null };

    } catch (error: any) {
      const message = error.response.data.message
      
      return { error: message };
    }
  }

  async function signIn({ email, password, rememberMe }: AuthData) {
    try {
      const response = await api.post("/users/login", { email, password });
      const { token } = response.data;
      
      setCookie(undefined, "session", token, { 
        maxAge: rememberMe ? 1 * 60 * 60 * 24 * 7 : undefined, // 7 days
      });
      
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      recoveryUserInformation()
      await Router.push("/dashboard")
      return { error: null };

    } catch (error: any) {
      const message: string = error.response.data.message;
      
      return { error: message };
    }
  };

  async function logOut() {

    try {
      await api.get("/users/logout");
      destroyCookie(undefined, "session");
      Router.reload()
      return { error: null };

    } catch (error: any) {
      const message = error.response.data.message;
      return { error };
    }

  }
  
  return (
    <AuthContext.Provider value={{ signIn, logOut, register, user }}>
      { children }
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  const authContext = useContext(AuthContext)
  return {...authContext}
}
