"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const Log_In = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 justify-center items-center w-[50%] h-[100vh]">
      <div className="flex absolute  top-8 left-[1085px]">
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
          placeholder="Enter email here"
          className="w-[22.7rem] h-10 rounded-md border py-2 px-3 border-[#e4e4e7]"
        />
      </div>
      <div>
        <h5 className="text-sm font-medium text-[#09090b]">Password</h5>
        <Input
          placeholder="Enter password here"
          className="w-[22.7rem] h-10 rounded-md border py-2 px-3 border-[#e4e4e7]"
        />
      </div>
      <div>
        <Button className="w-[22.7rem] h-10 px-4 py-2 rounded-md bg-[#18181b] opacity-20 ">
          continue
        </Button>
      </div>
    </div>
  );
};

export default Log_In;
