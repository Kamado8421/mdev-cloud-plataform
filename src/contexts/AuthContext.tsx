"use client";

import { ScreenMessageProps } from "@src/components/screen-message";
import { NEXT_PUBLIC_SECRET_KEY } from "@src/constants/tokens";
import UserType from "@src/interfaces/user.interface";
import { saveToken, clearToken } from "@src/services/jwt.service";
import { useRouter } from "next/navigation";
import ScreenMessage from "@src/components/screen-message";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: UserType | null;
  isLoading: boolean;
  screenMsg: ScreenMessageProps | null;
  setScreenMsg: (msg: ScreenMessageProps | null) => void;
  setIsLoading: (state: boolean) => void;
  setUser: (user: UserType | null) => void;
  login: (data: { email: string; password: string; }) => void;
  register: (data: { email: string; password: string; username: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [screenMsg, setScreenMsg] = useState<ScreenMessageProps | null>(null);

  const router = useRouter();

  async function login(data: { email: string; password: string; }) {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          auth_code: NEXT_PUBLIC_SECRET_KEY,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        mySetScreenMessage({
          type: 'error',
          message: result.error || 'Erro desconhecido'
        })
        return;
      }

      if (result?.token) {
        saveToken(result.token, result?.user?.id);
      }

      setUser(result.user);
      router.push('/dashboard');

    } catch (error) {
      console.error('Falha na requisição:', error);
      mySetScreenMessage({
        type: 'error',
        message: 'Erro na conexão com o servidor'
      })
    }

  }

  async function register(data: { email: string; password: string; username: string }) {

    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          auth_code: NEXT_PUBLIC_SECRET_KEY
        }),
      });

      // const result = res.json();

      if (res.ok) {
        router.push('/login');
        mySetScreenMessage({
          type: 'success',
          message: 'Registrado com sucesso. Faça seu login.'
        })
      } else {
        mySetScreenMessage({
          type: 'error',
          message: 'Login inválido'
        })
      }

      setIsLoading(false)

    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }


  function logout() {
    setUser(null);
    clearToken();
  }

  function mySetScreenMessage(info: ScreenMessageProps | null) {
    setScreenMsg(info)
    setTimeout(() => {
      setScreenMsg(null)
    }, 2500)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, setIsLoading, screenMsg, setUser, setScreenMsg: (info: ScreenMessageProps | null) => mySetScreenMessage(info) }}>
      {screenMsg && <ScreenMessage type={screenMsg.type} message={screenMsg.message} />}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

