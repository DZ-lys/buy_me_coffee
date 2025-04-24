"use client";
import { Label } from "@/components/ui/label";
import { Heart } from "lucide-react";
import { Header } from "./_components/Header";

export default function Home() {
  return (
    <div className="w-[59.688rem] h-[61.625rem] flex flex-col gap-5 ">
      <Header />
      <div className="w-[95%] h-64 border rounded-lg p-6 flex flex-col gap-3 "></div>
      <div>
        <Label className="font-semibold text-base  ">Recent transactions</Label>
      </div>
      <div className="w-[95%] max-h-[41.5rem] border rounded-lg p-6 flex flex-col justify-center items-center gap-3 ">
        <div className="w-96 h-32 flex flex-col gap-5 items-center justify-center ">
          <div>
            <Heart className="w-8 h-7" />
          </div>
          <div>
            <h6 className="font-semibold text-base text-center ">
              You don’t have any supporters yet
            </h6>
            <p className="font-normal text-base text-center">
              Share your page with your audience to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
