import { createContext, useContext, useState } from "react";

interface User {
  username: string;
  access_token: string;
}

export interface AuthContext {
  isAuthenticated: boolean;
  user: User | null;
  updateUser: (user: User) => void;
}

function getStoredUser(): User | null {
  const username = localStorage.getItem("username");
  const access_token = localStorage.getItem("token")
  if (username && access_token) {
    return {username, access_token}
  }
  return null
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const isAuthenticated = !!user;

  const updateUser = async (user: User) => {
    setUser(user);
    localStorage.setItem("username", user.username);
    localStorage.setItem("token", user.access_token);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, updateUser }}>
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
