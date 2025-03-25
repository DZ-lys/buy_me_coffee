"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function signUp() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-[50%] h-[100vh] ">
      <div className="flex absolute  top-8 left-[1085px]">
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
          className="w-[22.7rem] h-10 rounded-md border py-2 px-3 border-[#e4e4e7] "
        />
      </div>
      <div>
        <Button
          onClick={() => router.push("/sign-email")}
          className="w-[22.7rem] h-10 px-4 py-2 rounded-md bg-[#18181b] opacity-20 "
        >
          continue
        </Button>
      </div>
    </div>
  );
}

export default signUp;
