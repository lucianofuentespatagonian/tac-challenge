"use client";

import { useState } from "react";
import Link from "next/link";
import { Deposito } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, Trash2, Search } from "lucide-react";

interface DepositoTableProps {
  depositos: Deposito[];
  onDelete: (id: string) => void;
}

export function DepositoTable({ depositos, onDelete }: DepositoTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepositos = depositos.filter(
    (deposito) =>
      deposito.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposito.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposito.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, código o ubicación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {filteredDepositos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {searchTerm
              ? "No se encontraron depósitos con ese criterio"
              : "No hay depósitos registrados"}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead className="text-right">Capacidad</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepositos.map((deposito) => (
                <TableRow key={deposito.id}>
                  <TableCell className="font-mono text-sm">
                    {deposito.codigo}
                  </TableCell>
                  <TableCell className="font-medium">
                    {deposito.nombre}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{deposito.tipo}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {deposito.ubicacion}
                  </TableCell>
                  <TableCell className="text-right">
                    {deposito.capacidadMaxima || "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/depositos/${deposito.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/depositos/${deposito.id}/editar`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          if (
                            confirm(
                              "¿Estás seguro de eliminar este depósito?"
                            )
                          ) {
                            onDelete(deposito.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
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
