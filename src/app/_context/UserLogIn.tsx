"use client";
import { UserType } from "@/utils/types/type";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errors: { email?: string; password?: string };
  handleSubmit: (data: UserType) => Promise<UserType | false>;
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useLogIn = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useRegisterName must be used within a UserProvider");
  }
  return context;
};

export const LogInProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [user, setUser] = useState("");

  const handleSubmit = async (data: UserType): Promise<UserType | false> => {
    try {
      const response = await fetch(`/api/log-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrors({
          email: result.error?.includes("exist") ? result.error : undefined,
          password: result.error?.includes("password")
            ? result.error
            : undefined,
        });
        return false;
      }

      const userId = result.user;

      setUser(userId);

      const sendUserId = await fetch("/api/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId.id }),
      });

      const userResult = await sendUserId.json();
      console.log("Follow-up result:", userResult);

      return userId;
    } catch (err) {
      console.log("Unexpected error:", err);
      return false;
    }
  };
  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        errors,
        handleSubmit,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
