"use client";
import { Button } from "@/components/ui/button";
import { UserType } from "@/utils/type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "./_components/Header";
import { LeftMenu } from "@/components/LeftMenu";

export default function Home() {
  // const [data, setData] = useState<UserType[] | null>(null);

  // useEffect(() => {
  //   fetch("api/sign-up")
  //     .then((data) => data.json())
  //     .then((json) => setData(json.data));
  // }, []);
  // console.log(data);
  const router = useRouter();
  {
    /* {data && data[0].username} */
  }
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center relative ">
      <Header />
      <div className="flex absolute top-24 left-12">
        <LeftMenu />
        <div className="w-[59.688rem] h-[61.625rem] border border-amber-400 "></div>
      </div>
    </div>
  );
}
