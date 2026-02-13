import { useContext } from "react";
import { DepositosContext } from "@/contexts/DepositosContext";

export function useDepositos() {
  const context = useContext(DepositosContext);

  if (context === undefined) {
    throw new Error("useDepositos must be used within a DepositosProvider");
  }

  return context;
}
