"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { Usuario } from "@/types";
import {
  getFromStorage,
  saveToStorage,
  removeFromStorage,
  STORAGE_KEYS,
} from "@/lib/storage";
import { initialUsuarios } from "@/data/initial-data";

interface AuthContextType {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(() => {
    const storedUser = getFromStorage<Usuario>(STORAGE_KEYS.AUTH_USER);
    setUser(storedUser);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Inicializar usuarios si no existen
    const usuarios = getFromStorage<Usuario[]>(STORAGE_KEYS.USUARIOS);
    if (!usuarios || usuarios.length === 0) {
      saveToStorage(STORAGE_KEYS.USUARIOS, initialUsuarios);
    }

    checkAuth();
  }, [checkAuth]);

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const usuarios = getFromStorage<Usuario[]>(STORAGE_KEYS.USUARIOS) || [];

    const foundUser = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      saveToStorage(STORAGE_KEYS.AUTH_USER, foundUser);
      setUser(foundUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    removeFromStorage(STORAGE_KEYS.AUTH_USER);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
