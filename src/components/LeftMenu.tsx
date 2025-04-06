"use client";
import { ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export const LeftMenu = () => {
  const route = useRouter();

  return (
    <div className="w-64 h-40 flex flex-col gap-1  ">
      <div
        onClick={() => route.push("/")}
        className="w-full h-9 rounded-sm px-4 py-2 hover:cursor-pointer bg-[#f4f4f5]"
      >
        <button className="font-medium text-sm hover:cursor-pointer ">
          Home
        </button>
      </div>
      <div
        onClick={() => route.push("/explore")}
        className="w-full h-9 rounded-sm px-4 py-2 hover:cursor-pointer bg-[#f4f4f5] "
      >
        <button className="font-medium text-sm hover:cursor-pointer ">
          Explore
        </button>
      </div>
      <div
        onClick={() => route.push("/view-page")}
        className="w-full h-9 rounded-sm px-4 py-2 hover:cursor-pointer bg-[#f4f4f5] flex items-center gap-4 "
      >
        <button className="font-medium text-sm hover:cursor-pointer">
          View page
        </button>
        <ExternalLink className="w-4 h-4 accent-[#18181b]" />
      </div>
      <div
        onClick={() => route.push("/account-settings")}
        className="w-full h-9 rounded-sm px-4 py-2 hover:cursor-pointer bg-[#f4f4f5] "
      >
        <button className="font-medium text-sm hover:cursor-pointer ">
          Account settings
        </button>
      </div>
    </div>
  );
};
