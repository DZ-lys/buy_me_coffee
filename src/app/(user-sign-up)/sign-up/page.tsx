"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserType } from "@/utils/type";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function signUp() {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [data, setData] = useState<UserType[] | null>(null);

  useEffect(() => {
    fetch("api/sign-up")
      .then((data) => data.json())
      .then((json) => setData(json.data));
  }, []);
  console.log(data);

  useEffect(() => {
    validateForm();
  }, [name]);

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

  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-[50%] h-[100vh] ">
      <div className="flex absolute top-8 right-20">
        <Button
          onClick={() => router.push("/log-in")}
          className="px-4 py-2 rounded-md bg-[#f4f4f5] text-[#09090b] h-10 w-[4.5rem] "
        >
          Log in
        </Button>
      </div>
      <div className="flex flex-col justify-start w-[22.7rem] h-10 ">
        <h2 className="text-2xl font-semibold text-[#09090b] ">
          Create Your Account
        </h2>
        <p className="font-normal, text-sm text-[#71717a] ">
          Choose a username
        </p>
      </div>
      <div>
        <h5 className="text-sm font-medium text-[#09090b] ">Username</h5>
        <Input
          placeholder="Enter username here"
          value={name}
          className="w-[22.7rem] h-10 rounded-md border py-2 px-3 border-[#e4e4e7] "
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {errors.name && (
          <div className="flex gap-1 items-center">
            {" "}
            <XCircle className="text-red-400 w-5 h-5" />
            <p className="text-red-400">{errors.name}</p>
          </div>
        )}
      </div>
      <div>
        <Button
          disabled={!isFormValid}
          onClick={() => router.push("/sign-email")}
          className="w-[22.7rem] h-10 px-4 py-2 rounded-md bg-[#18181b] hover:cursor-pointer "
        >
          continue
        </Button>
      </div>
    </div>
  );
}

export default signUp;
