"use client";

import { useMemo, useState } from "react";
import { Stock, Producto, Deposito } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface StockTableProps {
  stocks: Stock[];
  productos: Producto[];
  depositos: Deposito[];
}

export function StockTable({ stocks, productos, depositos }: StockTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const stockConDetalle = useMemo(() => {
    return stocks.map((stock) => {
      const producto = productos.find((p) => p.id === stock.productoId);
      const deposito = depositos.find((d) => d.id === stock.depositoId);

      return {
        ...stock,
        producto,
        deposito,
      };
    });
  }, [stocks, productos, depositos]);

  const filteredStocks = stockConDetalle.filter(
    (stock) =>
      stock.producto?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.producto?.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.deposito?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStockBadge = (cantidad: number, minimo?: number) => {
    if (!minimo) {
      return <Badge variant="outline">{cantidad}</Badge>;
    }

    if (cantidad === 0) {
      return <Badge variant="destructive">Sin stock</Badge>;
    }

    if (cantidad < minimo * 0.25) {
      return <Badge variant="destructive">Crítico ({cantidad})</Badge>;
    }

    if (cantidad < minimo * 0.5) {
      return <Badge variant="warning">Bajo ({cantidad})</Badge>;
    }

    if (cantidad < minimo) {
      return <Badge variant="warning">Por debajo del mínimo ({cantidad})</Badge>;
    }

    return <Badge variant="success">Normal ({cantidad})</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por producto o depósito..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredStocks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchTerm
              ? "No se encontró stock con ese criterio"
              : "No hay registros de stock"}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Depósito</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead className="text-right">Mínimo</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.map((stock) => (
                <TableRow key={stock.id}>
                  <TableCell className="font-mono text-sm">
                    {stock.producto?.sku || "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {stock.producto?.nombre || "Producto no encontrado"}
                  </TableCell>
                  <TableCell>
                    {stock.deposito?.nombre || "Depósito no encontrado"}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {stock.cantidad}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {stock.producto?.stockMinimo || "N/A"}
                  </TableCell>
                  <TableCell>
                    {getStockBadge(stock.cantidad, stock.producto?.stockMinimo)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
