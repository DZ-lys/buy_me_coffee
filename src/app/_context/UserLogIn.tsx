"use client";
import { User_Type } from "@/utils/types/type";
import { useRouter } from "next/navigation";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface UserContextType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errors: { email?: string; password?: string };
  handleSubmit: (data: User_Type) => void;
  user: User_Type | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useLogIn = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useLogIn must be used within a UserProvider");
  }
  return context;
};

export const LogInProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const [user, setUser] = useState<User_Type | null>(null);

  const handleSubmit = async (data: User_Type) => {
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

      if (result.user.userid) {
        localStorage.setItem("userId", result.user.userid);
        console.log("Saved userId to localStorage:", result.user.userId);
      }

      setUser(result.user);

      console.log("USERIIN LOGIN RESULT", result.user);
      router.push("/create-profile");
      return result.user;
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
