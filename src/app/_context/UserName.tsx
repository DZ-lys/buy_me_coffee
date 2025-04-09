"use client";
import { UserType } from "@/utils/types/type";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  errors: { name?: string };
  isFormValid: boolean;
  data: UserType[] | null;
  setErrors: React.Dispatch<React.SetStateAction<{ name?: string }>>;
  setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  setData: React.Dispatch<React.SetStateAction<UserType[] | null>>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useRegisterName = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useRegisterName must be used within a UserProvider");
  }
  return context;
};

export const NameProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [data, setData] = useState<UserType[] | null>(null);

  const getUsers = async () => {
    const response = await fetch("/api/user");
    const data = await response.json();
    setData(data.users);
  };

  const validateForm = () => {
    let errors: { name?: string } = {};

    if (!name) {
      errors.name = "Username is required";
    }
    if (data && data.some((user) => user.username === name)) {
      errors.name = "Username is already taken";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
    getUsers();
  }, [name]);

  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        errors,
        setErrors,
        isFormValid,
        setIsFormValid,
        data,
        setData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
