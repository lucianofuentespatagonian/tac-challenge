import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProductosProvider } from "@/contexts/ProductosContext";
import { DepositosProvider } from "@/contexts/DepositosContext";
import { StockProvider } from "@/contexts/StockContext";
import { MovimientosProvider } from "@/contexts/MovimientosContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Gestión de Stock",
  description: "Aplicación web para gestionar inventario de productos y depósitos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <ProductosProvider>
            <DepositosProvider>
              <StockProvider>
                <MovimientosProvider>{children}</MovimientosProvider>
              </StockProvider>
            </DepositosProvider>
          </ProductosProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
