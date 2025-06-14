import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { UserService } from "../services/user.service.ts";
import User from "../models/user.model.ts";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  token: string | null;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = UserService.getUser();
    const storedToken = localStorage.getItem("token");
    if (storedUser) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    UserService.logout();
    setUser(null);
    setToken(null);
    window.location.replace("/");
  };

  const contextValue: UserContextType = {
    user,
    token,
    setUser,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
