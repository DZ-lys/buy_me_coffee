"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const signEmailPass = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; passsword?: string }>(
    {}
  );
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = () => {
    if (isFormValid) {
      console.log("Form submitted successfully!");
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

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
          Welcome, (placeholder)
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
        {errors.email && <p className="text-red-400">{errors.email}</p>}
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
        {errors.password && <p className="text-red-400">{errors.password}</p>}
      </div>
      <div>
        <Button
          onClick={() => router.push("/create-profile")}
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
