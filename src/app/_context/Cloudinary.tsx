"use client";
import { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useImgUpload = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("context must be used within a UserProvider");
  }
  return context;
};

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
