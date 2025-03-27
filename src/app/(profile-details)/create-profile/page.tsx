"use client";
import { useRouter } from "next/navigation";
import { Header } from "../../_components/Header";
import SetupStepOne from "../../_components/SetupStepOne";
import { Button } from "@/components/ui/button";

const createProfile = () => {
  const route = useRouter();

  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] ">
      <Header />
      <div>
        <SetupStepOne />
        <div className="w-[31.875rem] h-10 flex justify-end ">
          <Button
            onClick={() => route.push("/payment-details")}
            className="px-4 py-2 w-[15rem] h-10 "
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default createProfile;
