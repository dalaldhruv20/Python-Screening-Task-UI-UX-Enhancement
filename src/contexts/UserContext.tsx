import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "coordinator" | "instructor";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  institution: string;
  department: string;
  phone: string;
  role: UserRole;
}

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

const defaultUser: UserData = {
  firstName: "Workshop",
  lastName: "User",
  email: "user@institution.edu",
  username: "user",
  institution: "IIT Bombay",
  department: "Computer Science",
  phone: "",
  role: "coordinator",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);

  const login = (username: string) => {
    setUser({ ...defaultUser, username });
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn: !!user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
