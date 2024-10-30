import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { getUser, login, logout } from "../services/auth";

interface User {
  email: string;
  id: string;
  name: string;
}

interface UserContextType {
  loginUser: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; body: { user: User } }>;
  logoutUser: () => void;
  isAuth: () => Promise<boolean>;
  user: User | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      await isAuth();
      setLoading(false);
    };
    checkAuth();
  }, []);

  const loginUser = async (email: string, password: string) => {
    const data = await login(email, password);
    if (data.success) {
      setUser(data.body.user);
    }
    return data;
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  const isAuth = async () => {
    const data = await getUser();
    if (data.success) {
      setUser(data.body.user);
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        logoutUser,
        user,
        isAuth,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
