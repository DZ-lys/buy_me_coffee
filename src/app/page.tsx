"use client";
import { Button } from "@/components/ui/button";
import { UserType } from "@/utils/type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState<UserType[] | null>(null);

  useEffect(() => {
    fetch("api/sign-up")
      .then((data) => data.json())
      .then((json) => setData(json.data));
  }, []);
  console.log(data);
  const router = useRouter();

  return (
    <div>
      {data && data[0].username}
      <Button
        onClick={() => router.push("/sign-up")}
        className="px-4 py-2 rounded-md bg-[#f4f4f5] text-[#09090b] h-10 w-[4.5rem] "
      >
        Sign up
      </Button>
    </div>
  );
}
