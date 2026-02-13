"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Movimiento, Producto, Deposito, Usuario } from "@/types";
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
import { Button } from "@/components/ui/button";
import { Search, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface MovimientoTableProps {
  movimientos: Movimiento[];
  productos: Producto[];
  depositos: Deposito[];
  usuarios: Usuario[];
}

export function MovimientoTable({
  movimientos,
  productos,
  depositos,
  usuarios,
}: MovimientoTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const movimientosConDetalle = useMemo(() => {
    return movimientos.map((mov) => {
      const producto = productos.find((p) => p.id === mov.productoId);
      const depositoOrigen = mov.depositoOrigenId
        ? depositos.find((d) => d.id === mov.depositoOrigenId)
        : undefined;
      const depositoDestino = mov.depositoDestinoId
        ? depositos.find((d) => d.id === mov.depositoDestinoId)
        : undefined;
      const usuario = usuarios.find((u) => u.id === mov.usuarioId);

      return {
        ...mov,
        producto,
        depositoOrigen,
        depositoDestino,
        usuario,
      };
    });
  }, [movimientos, productos, depositos, usuarios]);

  const filteredMovimientos = movimientosConDetalle.filter(
    (mov) =>
      mov.producto?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mov.depositoOrigen?.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      mov.depositoDestino?.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      mov.motivo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTipoBadge = (tipo: string) => {
    const variants = {
      entrada: "success",
      salida: "destructive",
      transferencia: "info",
    } as const;

    return variants[tipo as keyof typeof variants] || "outline";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar movimientos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredMovimientos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchTerm
              ? "No se encontraron movimientos con ese criterio"
              : "No hay movimientos registrados"}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Producto</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Destino</TableHead>
                <TableHead className="text-right">Cantidad</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovimientos.map((mov) => (
                <TableRow key={mov.id}>
                  <TableCell className="text-sm">
                    {formatDate(mov.fecha)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTipoBadge(mov.tipo)}>
                      {mov.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {mov.producto?.nombre || "N/A"}
                  </TableCell>
                  <TableCell>
                    {mov.depositoOrigen?.nombre || "-"}
                  </TableCell>
                  <TableCell>
                    {mov.depositoDestino?.nombre || "-"}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {mov.cantidad}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {mov.usuario?.nombre || "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/movimientos/${mov.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
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
