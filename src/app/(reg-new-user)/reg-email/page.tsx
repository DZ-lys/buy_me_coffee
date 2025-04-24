"use client";
import ErrorText from "@/app/_components/ErrorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useRegisterName } from "@/app/_context/UserName";
import { useRegisterEmail } from "@/app/_context/UserEmail";

const SignEmailPass = () => {
  const router = useRouter();
  const { name } = useRegisterName();
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isFormValid,
    handleSubmit,
  } = useRegisterEmail();

  const onSubmit = async () => {
    const success = await handleSubmit();
    if (success) router.push("/log-in");
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-[50%] h-[100vh]">
      <div className="flex absolute top-8 right-20">
        <Button
          onClick={() => router.push("/log-in")}
          className="px-4 py-2 rounded-md bg-[#f4f4f5] text-[#09090b] h-10 w-[4.5rem]"
        >
          Log in
        </Button>
      </div>
      <div className="w-[22.7rem] h-10 flex flex-col justify-start">
        <h2 className="font-semibold text-2xl text-[#09090b] ">
          Welcome, {name}
        </h2>
        <p className="text-sm font-normal text-[#71717a] ">
          Connect email and set a password
        </p>
      </div>
      <div>
        <h5 className="text-sm font-medium text-[#09090b] ">Email</h5>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email here"
          className="w-[22.7rem] h-10 rounded-md border py-2 px-3 border-[#e4e4e7]"
        />
        <ErrorText message={errors.email} />
      </div>
      <div>
        <h5 className="text-sm font-medium text-[#09090b]">Password</h5>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password here"
          className="w-[22.7rem] h-10 rounded-md border py-2 px-3 border-[#e4e4e7]"
        />
        <ErrorText message={errors.password} />
      </div>
      <div>
        <Button
          onClick={onSubmit}
          disabled={!isFormValid}
          className="w-[22.7rem] h-10 px-4 py-2 rounded-md bg-[#18181b]"
        >
          continue
        </Button>
      </div>
    </div>
  );
};

export default SignEmailPass;
