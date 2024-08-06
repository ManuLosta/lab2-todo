import { createContext, useContext, useState } from "react";

interface User {
  username: string;
  access_token: string;
}

export interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
}

function getStoredUser() {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const isAuthenticated = false;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
