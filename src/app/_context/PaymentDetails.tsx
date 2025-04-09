"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  country: string;
  first_name: string;
  last_name: string;
  card_number: string;
  expiry_date: { month?: string; year?: string };
  cvc: string;
  errors: {
    country?: string;
    first_name?: string;
    last_name?: string;
    card_number?: string;
    expiry_date?: string;
    cvc?: string;
  };
  isFormValid: boolean;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setFirst_name: React.Dispatch<React.SetStateAction<string>>;
  setLast_name: React.Dispatch<React.SetStateAction<string>>;
  setCard_number: React.Dispatch<React.SetStateAction<string>>;
  setExpiry_date: React.Dispatch<
    React.SetStateAction<{ month?: string; year?: string }>
  >;
  setCVC: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => Promise<boolean>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const usePaymentDetails = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useRegisterEmail must be used within a UserProvider");
  }
  return context;
};

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [country, setCountry] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [card_number, setCard_number] = useState("");
  const [expiry_date, setExpiry_date] = useState<{
    month?: string;
    year?: string;
  }>({});
  const [cvc, setCVC] = useState("");
  const [errors, setErrors] = useState<{
    country?: string;
    first_name?: string;
    last_name?: string;
    card_number?: string;
    expiry_date?: string;
    cvc?: string;
  }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    let errors: {
      country?: string;
      first_name?: string;
      last_name?: string;
      card_number?: string;
      expiry_date?: string;
      cvc?: string;
    } = {};

    if (!country) {
      errors.country = "Select country to continue";
    }
    if (!first_name) {
      errors.first_name = "First name must match";
    }
    if (!last_name) {
      errors.last_name = "Last name must match";
    }
    if (
      !card_number ||
      !card_number.search(/[a-z]/) ||
      !card_number.search(/[A-Z]/) ||
      card_number.length < 19
    ) {
      errors.card_number = "invalid card number";
    }
    if (!expiry_date.month || !expiry_date.year) {
      errors.expiry_date = "Invalid expiry date";
    }
    if (
      !cvc ||
      !cvc.search(/[a-z]/) ||
      !cvc.search(/[A-Z]/) ||
      cvc.length < 3
    ) {
      errors.cvc = "invalid CVC";
    }
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/bank-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country,
          first_name,
          last_name,
          card_number,
          expiry_date,
          cvc,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCountry(""),
          setFirst_name(""),
          setLast_name(""),
          setCard_number(""),
          setExpiry_date({}),
          setCVC("");
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

  useEffect(() => {
    validateForm();
  }, [country, first_name, last_name, card_number, expiry_date, cvc]);
  return (
    <UserContext.Provider
      value={{
        country,
        first_name,
        last_name,
        card_number,
        expiry_date,
        cvc,
        errors,
        isFormValid,
        setCountry,
        setFirst_name,
        setLast_name,
        setCard_number,
        setExpiry_date,
        setCVC,
        handleSubmit,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
