export type RolUsuario = "admin" | "operador" | "visualizador";

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password: string;
  rol: RolUsuario;
}

export interface UsuarioFormData {
  nombre: string;
  email: string;
  password: string;
  rol: RolUsuario;
}

export interface LoginFormData {
  email: string;
  password: string;
}
