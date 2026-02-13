"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { Movimiento } from "@/types";
import {
  getFromStorage,
  saveToStorage,
  STORAGE_KEYS,
  hasInStorage,
} from "@/lib/storage";
import { generateInitialMovimientos, initialUsuarios } from "@/data/initial-data";

interface MovimientosContextType {
  movimientos: Movimiento[];
  isLoading: boolean;
  getMovimiento: (id: string) => Movimiento | undefined;
  refreshMovimientos: () => void;
}

export const MovimientosContext = createContext<
  MovimientosContextType | undefined
>(undefined);

export function MovimientosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMovimientos = useCallback(() => {
    if (!hasInStorage(STORAGE_KEYS.MOVIMIENTOS)) {
      const adminUser = initialUsuarios.find((u) => u.rol === "admin");
      const initialMovimientos = adminUser
        ? generateInitialMovimientos(adminUser.id)
        : [];
      saveToStorage(STORAGE_KEYS.MOVIMIENTOS, initialMovimientos);
      setMovimientos(initialMovimientos);
    } else {
      const storedMovimientos =
        getFromStorage<Movimiento[]>(STORAGE_KEYS.MOVIMIENTOS) || [];
      setMovimientos(storedMovimientos);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadMovimientos();
  }, [loadMovimientos]);

  const getMovimiento = useCallback(
    (id: string) => {
      return movimientos.find((m) => m.id === id);
    },
    [movimientos]
  );

  const refreshMovimientos = useCallback(() => {
    loadMovimientos();
  }, [loadMovimientos]);

  return (
    <MovimientosContext.Provider
      value={{
        movimientos,
        isLoading,
        getMovimiento,
        refreshMovimientos,
      }}
    >
      {children}
    </MovimientosContext.Provider>
  );
}
