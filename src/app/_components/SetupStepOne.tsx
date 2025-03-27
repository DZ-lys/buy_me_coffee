import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera } from "lucide-react";

const SetupStepOne = () => {
  return (
    <div className="w-[31.875rem] h-[39.438rem] flex flex-col gap-6 ">
      <div>
        <h2 className="font-semibold text-2xl ">Complete your profile page</h2>
      </div>
      <div className="flex flex-col gap-3 w-40 h-[11.5rem] ">
        <Label>Add photo</Label>
        <div className="w-40 h-40 rounded-full relative border-2 flex flex-col justify-center items-center border-dashed overflow-hidden ">
          <Camera className="absolute opacity-40 w-7 h-7 " />
          <Input
            id="picture"
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Label>Name</Label>
        <Input placeholder="Enter your name here" className="py-2 px-3  " />
      </div>
      <div className="flex flex-col gap-3">
        <Label>About</Label>
        <Input
          placeholder="Write about yourself here"
          className="px-3 py-2 h-32 relative placeholder:absolute placeholder:top-3 "
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label>Social media URL</Label>
        <Input placeholder="https://" />
      </div>
    </div>
  );
};

export default SetupStepOne;
