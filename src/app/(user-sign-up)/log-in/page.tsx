"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserType } from "@/utils/types/type";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Log_In = () => {
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
  const router = useRouter();

  const onSubmit = async () => {
    const user = await handleSubmit({ email, password } as UserType);
    if (user) {
      console.log("User details:", user);
      router.push("/create-profile");
    }
  };

  console.log(user);

  return (
    <div className="relative flex flex-col gap-5 justify-center items-center w-[50%] h-[100vh]">
      <div className="flex absolute top-8 right-20">
        <Button
          onClick={() => router.push("/sign-up")}
          className="px-4 py-2 rounded-md bg-[#f4f4f5] text-[#09090b] h-10 w-[4.5rem] "
        >
          Sign up
        </Button>
      </div>
      <div>
        <h2 className="font-semibold text-2xl text-[#09090b] ">Welcome back</h2>
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
          disabled={!email || !password}
          className="w-[22.7rem] h-10 px-4 py-2 rounded-md bg-[#18181b] "
          onClick={onSubmit}
        >
          continue
        </Button>
      </div>
    </div>
  );
};

export default Log_In;
