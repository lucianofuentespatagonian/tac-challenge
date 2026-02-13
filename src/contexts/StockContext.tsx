"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { Stock, MovimientoFormData, Movimiento } from "@/types";
import {
  getFromStorage,
  saveToStorage,
  STORAGE_KEYS,
  hasInStorage,
} from "@/lib/storage";
import { generateInitialStock } from "@/data/initial-data";
import { generateId } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

interface StockContextType {
  stocks: Stock[];
  isLoading: boolean;
  getStockByProducto: (productoId: string) => Stock[];
  getStockByDeposito: (depositoId: string) => Stock[];
  getStockByProductoDeposito: (
    productoId: string,
    depositoId: string
  ) => Stock | undefined;
  ajustarStock: (movimiento: MovimientoFormData) => void;
  refreshStock: () => void;
}

export const StockContext = createContext<StockContextType | undefined>(
  undefined
);

export function StockProvider({ children }: { children: React.ReactNode }) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const loadStock = useCallback(() => {
    if (!hasInStorage(STORAGE_KEYS.STOCK)) {
      const initialStock = generateInitialStock();
      saveToStorage(STORAGE_KEYS.STOCK, initialStock);
      setStocks(initialStock);
    } else {
      const storedStock = getFromStorage<Stock[]>(STORAGE_KEYS.STOCK) || [];
      setStocks(storedStock);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadStock();
  }, [loadStock]);

  const getStockByProducto = useCallback(
    (productoId: string) => {
      return stocks.filter((s) => s.productoId === productoId);
    },
    [stocks]
  );

  const getStockByDeposito = useCallback(
    (depositoId: string) => {
      return stocks.filter((s) => s.depositoId === depositoId);
    },
    [stocks]
  );

  const getStockByProductoDeposito = useCallback(
    (productoId: string, depositoId: string) => {
      return stocks.find(
        (s) => s.productoId === productoId && s.depositoId === depositoId
      );
    },
    [stocks]
  );

  const ajustarStock = useCallback(
    (movimientoData: MovimientoFormData) => {
      if (!user) {
        throw new Error("Usuario no autenticado");
      }

      const { tipo, productoId, depositoOrigenId, depositoDestinoId, cantidad } =
        movimientoData;

      let updatedStocks = [...stocks];

      // Validar y ajustar según el tipo de movimiento
      if (tipo === "entrada") {
        if (!depositoDestinoId) {
          throw new Error("Debe especificar un depósito destino");
        }

        // Buscar o crear registro de stock
        const stockIndex = updatedStocks.findIndex(
          (s) => s.productoId === productoId && s.depositoId === depositoDestinoId
        );

        if (stockIndex >= 0) {
          // Actualizar stock existente
          updatedStocks[stockIndex] = {
            ...updatedStocks[stockIndex],
            cantidad: updatedStocks[stockIndex].cantidad + cantidad,
            fechaActualizacion: new Date().toISOString(),
          };
        } else {
          // Crear nuevo registro de stock
          updatedStocks.push({
            id: generateId(),
            productoId,
            depositoId: depositoDestinoId,
            cantidad,
            fechaActualizacion: new Date().toISOString(),
          });
        }
      } else if (tipo === "salida") {
        if (!depositoOrigenId) {
          throw new Error("Debe especificar un depósito origen");
        }

        const stockIndex = updatedStocks.findIndex(
          (s) => s.productoId === productoId && s.depositoId === depositoOrigenId
        );

        if (stockIndex < 0) {
          throw new Error("No hay stock disponible en ese depósito");
        }

        if (updatedStocks[stockIndex].cantidad < cantidad) {
          throw new Error(
            `Stock insuficiente. Disponible: ${updatedStocks[stockIndex].cantidad}`
          );
        }

        updatedStocks[stockIndex] = {
          ...updatedStocks[stockIndex],
          cantidad: updatedStocks[stockIndex].cantidad - cantidad,
          fechaActualizacion: new Date().toISOString(),
        };
      } else if (tipo === "transferencia") {
        if (!depositoOrigenId || !depositoDestinoId) {
          throw new Error("Debe especificar depósito origen y destino");
        }

        // Validar stock origen
        const stockOrigenIndex = updatedStocks.findIndex(
          (s) => s.productoId === productoId && s.depositoId === depositoOrigenId
        );

        if (stockOrigenIndex < 0) {
          throw new Error("No hay stock disponible en el depósito origen");
        }

        if (updatedStocks[stockOrigenIndex].cantidad < cantidad) {
          throw new Error(
            `Stock insuficiente en origen. Disponible: ${updatedStocks[stockOrigenIndex].cantidad}`
          );
        }

        // Restar del origen
        updatedStocks[stockOrigenIndex] = {
          ...updatedStocks[stockOrigenIndex],
          cantidad: updatedStocks[stockOrigenIndex].cantidad - cantidad,
          fechaActualizacion: new Date().toISOString(),
        };

        // Sumar al destino
        const stockDestinoIndex = updatedStocks.findIndex(
          (s) => s.productoId === productoId && s.depositoId === depositoDestinoId
        );

        if (stockDestinoIndex >= 0) {
          updatedStocks[stockDestinoIndex] = {
            ...updatedStocks[stockDestinoIndex],
            cantidad: updatedStocks[stockDestinoIndex].cantidad + cantidad,
            fechaActualizacion: new Date().toISOString(),
          };
        } else {
          updatedStocks.push({
            id: generateId(),
            productoId,
            depositoId: depositoDestinoId,
            cantidad,
            fechaActualizacion: new Date().toISOString(),
          });
        }
      }

      // Guardar stock actualizado
      setStocks(updatedStocks);
      saveToStorage(STORAGE_KEYS.STOCK, updatedStocks);

      // Crear movimiento
      const nuevoMovimiento: Movimiento = {
        id: generateId(),
        tipo,
        productoId,
        depositoOrigenId,
        depositoDestinoId,
        cantidad,
        motivo: movimientoData.motivo,
        usuarioId: user.id,
        fecha: new Date().toISOString(),
      };

      // Guardar movimiento
      const movimientos =
        getFromStorage<Movimiento[]>(STORAGE_KEYS.MOVIMIENTOS) || [];
      const updatedMovimientos = [nuevoMovimiento, ...movimientos];
      saveToStorage(STORAGE_KEYS.MOVIMIENTOS, updatedMovimientos);
    },
    [stocks, user]
  );

  const refreshStock = useCallback(() => {
    loadStock();
  }, [loadStock]);

  return (
    <StockContext.Provider
      value={{
        stocks,
        isLoading,
        getStockByProducto,
        getStockByDeposito,
        getStockByProductoDeposito,
        ajustarStock,
        refreshStock,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}
