"use client";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();

  return (
    <div className="w-[100vw] h-14 absolute top-0 flex justify-center py-2 px-4 items-center ">
      <div className="w-[95%] h-10 flex justify-between items-center ">
        <div className="flex gap-2 w-37 h-5 items-center ">
          <Coffee />
          <h2 className="font-bold text-base ">Buy Me Coffee</h2>
        </div>
        <Button
          onClick={() => router.push("/log-in")}
          className=" px-4 py-2 rounded-md bg-[#f4f4f5] text-[#09090b] h-10 w-[4.5rem] "
        >
          Log out
        </Button>
      </div>
    </div>
  );
};
