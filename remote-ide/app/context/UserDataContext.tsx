"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { UserType } from "../CodeEditor/[id]/FileExplorer/types";

// shape of context value
type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType) => void;
};

// Create the context with default undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use context
export const useUserdata = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used inside UserProvider");
  return context;
};
