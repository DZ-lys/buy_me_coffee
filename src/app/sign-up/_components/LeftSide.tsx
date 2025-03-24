import { Coffee } from "lucide-react";

export const LeftLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[50%] h-[100vh] bg-amber-400 ">
      <div className="flex absolute gap-2 w-36 h-5 items-center top-8 left-20 ">
        <Coffee />
        <h2 className="font-bold text-base ">Buy Me Coffee</h2>
      </div>
      <div className="flex flex-col gap-6 items-center w-[28.438rem] h-96">
        <img
          width={240}
          height={240}
          src="https://res.cloudinary.com/da889nybx/image/upload/v1742804149/gcgphmymipztl6sij30m.png"
          alt="buy me coffee logo"
        />
        <h4 className="font-bold text-2xl text-center ">
          Fund your creative work
        </h4>
        <p className="text-center font-normal text-base ">
          Accept support. Start a membership. Setup a shop. It’s easier than you
          think.
        </p>
      </div>
    </div>
  );
};
