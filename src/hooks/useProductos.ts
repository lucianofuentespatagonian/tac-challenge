import { useContext } from "react";
import { ProductosContext } from "@/contexts/ProductosContext";

export function useProductos() {
  const context = useContext(ProductosContext);

  if (context === undefined) {
    throw new Error("useProductos must be used within a ProductosProvider");
  }

  return context;
}
