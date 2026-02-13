"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { Deposito } from "@/types";
import {
  getFromStorage,
  saveToStorage,
  STORAGE_KEYS,
  hasInStorage,
} from "@/lib/storage";
import { initialDepositos } from "@/data/initial-data";
import { generateId } from "@/lib/utils";

interface DepositosContextType {
  depositos: Deposito[];
  isLoading: boolean;
  getDeposito: (id: string) => Deposito | undefined;
  createDeposito: (deposito: Omit<Deposito, "id" | "fechaCreacion">) => Deposito;
  updateDeposito: (id: string, deposito: Partial<Deposito>) => void;
  deleteDeposito: (id: string) => void;
  refreshDepositos: () => void;
}

export const DepositosContext = createContext<DepositosContextType | undefined>(
  undefined
);

export function DepositosProvider({ children }: { children: React.ReactNode }) {
  const [depositos, setDepositos] = useState<Deposito[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDepositos = useCallback(() => {
    if (!hasInStorage(STORAGE_KEYS.APP_INITIALIZED)) {
      saveToStorage(STORAGE_KEYS.DEPOSITOS, initialDepositos);
      setDepositos(initialDepositos);
    } else {
      const storedDepositos = getFromStorage<Deposito[]>(STORAGE_KEYS.DEPOSITOS) || [];
      setDepositos(storedDepositos);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadDepositos();
  }, [loadDepositos]);

  const getDeposito = useCallback(
    (id: string) => {
      return depositos.find((d) => d.id === id);
    },
    [depositos]
  );

  const createDeposito = useCallback(
    (depositoData: Omit<Deposito, "id" | "fechaCreacion">) => {
      const newDeposito: Deposito = {
        ...depositoData,
        id: generateId(),
        fechaCreacion: new Date().toISOString(),
      };

      const updatedDepositos = [...depositos, newDeposito];
      setDepositos(updatedDepositos);
      saveToStorage(STORAGE_KEYS.DEPOSITOS, updatedDepositos);

      return newDeposito;
    },
    [depositos]
  );

  const updateDeposito = useCallback(
    (id: string, depositoData: Partial<Deposito>) => {
      const updatedDepositos = depositos.map((d) =>
        d.id === id ? { ...d, ...depositoData } : d
      );
      setDepositos(updatedDepositos);
      saveToStorage(STORAGE_KEYS.DEPOSITOS, updatedDepositos);
    },
    [depositos]
  );

  const deleteDeposito = useCallback(
    (id: string) => {
      const updatedDepositos = depositos.filter((d) => d.id !== id);
      setDepositos(updatedDepositos);
      saveToStorage(STORAGE_KEYS.DEPOSITOS, updatedDepositos);
    },
    [depositos]
  );

  const refreshDepositos = useCallback(() => {
    loadDepositos();
  }, [loadDepositos]);

  return (
    <DepositosContext.Provider
      value={{
        depositos,
        isLoading,
        getDeposito,
        createDeposito,
        updateDeposito,
        deleteDeposito,
        refreshDepositos,
      }}
    >
      {children}
    </DepositosContext.Provider>
  );
}
