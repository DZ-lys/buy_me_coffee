"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserType } from "@/utils/types/type";
import { XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const signEmailPass = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [isFormValid, setIsFormValid] = useState(false);
  const [data, setData] = useState<UserType[] | null>(null);

  const getUsers = async () => {
    const response = await fetch("/api/user");
    const data = await response.json();
    setData(data.users);
  };

  const searchedName = useSearchParams();
  const name = searchedName.get("name");

  const username = name;

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username: username }),
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
    } else if (password.search(/[A-Z]/) === -1) {
      errors.password = "Password must contain at least one upper case letter";
    } else if (password.search(/[0-9]/) === -1) {
      errors.password = "Password must contain at least one number";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    validateForm();
    getUsers();
  }, [email, password]);

  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-[50%] h-[100vh]">
      <div className="flex absolute top-8 right-20">
        <Button
          onClick={() => router.push("/log-in")}
          className="px-4 py-2 rounded-md bg-[#f4f4f5] text-[#09090b] h-10 w-[4.5rem] "
        >
          Log in
        </Button>
      </div>
      <div className="w-[22.7rem] h-10 flex flex-col justify-start">
        <h2 className="font-semibold text-2xl text-[#09090b] ">
          Welcome, {name}
        </h2>
        <p className="text-sm font-normal text-[#71717a] ">
          Connect email and set a password
        </p>
      </div>
      <div>
        <h5 className="text-sm font-medium text-[#09090b] ">Email</h5>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter email here"
          className="w-[22.7rem] h-10 rounded-md border py-2 px-3 border-[#e4e4e7]"
        />
        {errors.email && (
          <div className="flex gap-1 items-center">
            {" "}
            <XCircle className="text-red-400 w-5 h-5" />
            <p className="text-red-400">{errors.email}</p>
          </div>
        )}
      </div>
      <div>
        <h5 className="text-sm font-medium text-[#09090b]">Password</h5>
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter password here"
          className="w-[22.7rem] h-10 rounded-md border py-2 px-3 border-[#e4e4e7]"
        />
        {errors.password && (
          <div className="flex gap-1 items-center">
            {" "}
            <XCircle className="text-red-400 w-5 h-5" />
            <p className="text-red-400">{errors.password}</p>
          </div>
        )}
      </div>
      <div>
        <Button
          onClick={async () => {
            await handleSubmit();
            router.push("/create-profile");
          }}
          type="submit"
          disabled={!isFormValid}
          className="w-[22.7rem] h-10 px-4 py-2 rounded-md bg-[#18181b]"
        >
          continue
        </Button>
      </div>
    </div>
  );
};

export default signEmailPass;
