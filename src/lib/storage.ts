/**
 * Wrapper type-safe para localStorage
 */

export const STORAGE_KEYS = {
  AUTH_USER: "auth_user",
  USUARIOS: "usuarios",
  PRODUCTOS: "productos",
  DEPOSITOS: "depositos",
  STOCK: "stock",
  MOVIMIENTOS: "movimientos",
  APP_INITIALIZED: "app_initialized",
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/**
 * Obtiene un valor de localStorage y lo parsea
 */
export function getFromStorage<T>(key: StorageKey): T | null {
  if (typeof window === "undefined") return null;

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return null;
  }
}

/**
 * Guarda un valor en localStorage
 */
export function saveToStorage<T>(key: StorageKey, value: T): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
  }
}

/**
 * Elimina un valor de localStorage
 */
export function removeFromStorage(key: StorageKey): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
}

/**
 * Limpia completamente localStorage
 */
export function clearStorage(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

/**
 * Verifica si existe un key en localStorage
 */
export function hasInStorage(key: StorageKey): boolean {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(key) !== null;
}
