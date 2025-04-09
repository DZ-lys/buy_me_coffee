"use client";
import { useRouter } from "next/navigation";
import { Header } from "../../_components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import ErrorText from "@/app/_components/ErrorText";
import { useCreateProfile } from "@/app/_context/CreateProfile";

const createProfile = () => {
  const route = useRouter();

  const {
    name,
    about,
    social_media_url,
    errors,
    isFormValid,
    handleSubmit,
    setName,
    setAbout,
    setSocial_media_url,
    photoPreview,
    handlePhotoChange,
  } = useCreateProfile();

  const onSubmit = async () => {
    const success = await handleSubmit();
    if (success) route.push("/payment-details");
  };

  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] ">
      <Header />
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="font-semibold text-2xl ">
            Complete your profile page
          </h2>
        </div>
        <div className="flex flex-col gap-3 w-40 h-[11.5rem] space-y-2 ">
          <Label>Add photo</Label>
          <div className="flex justify-center">
            <div className="relative w-44 h-44 ">
              <label htmlFor="photo-upload" className="cursor-pointer">
                <div className="w-44 h-44 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  {photoPreview ? (
                    <Image
                      src={photoPreview || "/placeholder.svg"}
                      alt="Profile preview"
                      fill
                      className="object-cover rounded-full"
                    />
                  ) : (
                    <Camera className="h-8 w-8 text-gray-400" />
                  )}
                </div>
              </label>
              <Input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
          </div>
          <ErrorText message={errors.photoPreview} />
        </div>
        <div className="flex flex-col gap-3 mt-16">
          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter your name here"
            className="py-2 px-3  "
          />
          <ErrorText message={errors.name} />
        </div>
        <div className="flex flex-col gap-3">
          <Label>About</Label>
          <Textarea
            value={about}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            placeholder="Write about yourself here"
            className="px-3 py-2 h-32 relative "
          />

          <ErrorText message={errors.about} />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Social media URL</Label>
          <Input
            value={social_media_url}
            onChange={(e) => {
              setSocial_media_url(e.target.value);
            }}
            placeholder="https://"
          />
          <ErrorText message={errors.social_media_url} />
        </div>
        <div className=" w-[31.875rem] h-10 flex justify-end ">
          <Button
            disabled={!isFormValid}
            onClick={onSubmit}
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
