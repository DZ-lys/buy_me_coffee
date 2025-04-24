"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRegisterName } from "./UserName";
import { User_Type } from "@/utils/types/type";

interface UserContextType {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  errors: { email?: string; password?: string };
  isFormValid: boolean;
  handleSubmit: () => Promise<boolean>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useRegisterEmail = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useRegisterEmail must be used within a UserProvider");
  }
  return context;
};

export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const { name } = useRegisterName();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [data, setData] = useState<User_Type[] | null>(null);

  const username = name;

  const getUsers = async () => {
    const response = await fetch("/api/user");
    const data = await response.json();
    setData(data.users);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmail("");
        setPassword("");
        return true;
      } else {
        alert("Error: " + data.error);
        return false;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return false;
    }
  };

  const validateForm = () => {
    let errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    } else if (data && data.some((user) => user.email === email)) {
      errors.email = "Email is already in use";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain at least one number";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
    getUsers();
  }, [email, password]);

  return (
    <UserContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        errors,
        isFormValid,
        handleSubmit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
