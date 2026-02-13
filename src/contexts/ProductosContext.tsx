"use client";

import React, { createContext, useState, useEffect, useCallback } from "react";
import { Producto } from "@/types";
import {
  getFromStorage,
  saveToStorage,
  STORAGE_KEYS,
  hasInStorage,
} from "@/lib/storage";
import { initialProductos } from "@/data/initial-data";
import { generateId } from "@/lib/utils";

interface ProductosContextType {
  productos: Producto[];
  isLoading: boolean;
  getProducto: (id: string) => Producto | undefined;
  createProducto: (producto: Omit<Producto, "id" | "fechaCreacion">) => Producto;
  updateProducto: (id: string, producto: Partial<Producto>) => void;
  deleteProducto: (id: string) => void;
  refreshProductos: () => void;
}

export const ProductosContext = createContext<ProductosContextType | undefined>(
  undefined
);

export function ProductosProvider({ children }: { children: React.ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProductos = useCallback(() => {
    // Si no se ha inicializado la app, cargar datos iniciales
    if (!hasInStorage(STORAGE_KEYS.APP_INITIALIZED)) {
      saveToStorage(STORAGE_KEYS.PRODUCTOS, initialProductos);
      saveToStorage(STORAGE_KEYS.APP_INITIALIZED, true);
      setProductos(initialProductos);
    } else {
      const storedProductos = getFromStorage<Producto[]>(STORAGE_KEYS.PRODUCTOS) || [];
      setProductos(storedProductos);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  const getProducto = useCallback(
    (id: string) => {
      return productos.find((p) => p.id === id);
    },
    [productos]
  );

  const createProducto = useCallback(
    (productoData: Omit<Producto, "id" | "fechaCreacion">) => {
      const newProducto: Producto = {
        ...productoData,
        id: generateId(),
        fechaCreacion: new Date().toISOString(),
      };

      const updatedProductos = [...productos, newProducto];
      setProductos(updatedProductos);
      saveToStorage(STORAGE_KEYS.PRODUCTOS, updatedProductos);

      return newProducto;
    },
    [productos]
  );

  const updateProducto = useCallback(
    (id: string, productoData: Partial<Producto>) => {
      const updatedProductos = productos.map((p) =>
        p.id === id ? { ...p, ...productoData } : p
      );
      setProductos(updatedProductos);
      saveToStorage(STORAGE_KEYS.PRODUCTOS, updatedProductos);
    },
    [productos]
  );

  const deleteProducto = useCallback(
    (id: string) => {
      const updatedProductos = productos.filter((p) => p.id !== id);
      setProductos(updatedProductos);
      saveToStorage(STORAGE_KEYS.PRODUCTOS, updatedProductos);
    },
    [productos]
  );

  const refreshProductos = useCallback(() => {
    loadProductos();
  }, [loadProductos]);

  return (
    <ProductosContext.Provider
      value={{
        productos,
        isLoading,
        getProducto,
        createProducto,
        updateProducto,
        deleteProducto,
        refreshProductos,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
