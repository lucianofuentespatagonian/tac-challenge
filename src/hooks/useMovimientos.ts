import { useContext } from "react";
import { MovimientosContext } from "@/contexts/MovimientosContext";

export function useMovimientos() {
  const context = useContext(MovimientosContext);

  if (context === undefined) {
    throw new Error("useMovimientos must be used within a MovimientosProvider");
  }

  return context;
}
