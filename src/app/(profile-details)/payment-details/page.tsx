"use client";
import { Header } from "@/app/_components/Header";
import SetupStepTwo from "@/app/_components/SetupStepTwo";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const paymentDetails = () => {
  const route = useRouter();

  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] ">
      <Header />
      <div className="flex flex-col gap-8">
        <SetupStepTwo />
        <div className="w-[31.875rem] h-10 flex justify-end ">
          <Button
            onClick={() => route.push("/")}
            className="px-4 py-2 w-[15rem] h-10 "
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default paymentDetails;
