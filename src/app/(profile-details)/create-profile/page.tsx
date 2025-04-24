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
import { useEffect, useState } from "react";
import { useLogIn } from "@/app/_context/UserLogIn";

const CreateProfile = () => {
  const route = useRouter();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [social_media_url, setSocial_media_url] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [file, setFile] = useState<File>();
  const [avatar_image, setAvatar_image] = useState("");
  const { user } = useLogIn();

  const [errors, setErrors] = useState<{
    name?: string;
    about?: string;
    social_media_url?: string;
    photoPreview?: string;
  }>({});

  const PRESET_NAME = "buy_me_coffee";
  const CLOUDINARY_NAME = "da889nybx";

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar_image(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (!file) {
      return;
    }
    formData.append("file", file);
    formData.append("upload_preset", PRESET_NAME);
    formData.append("api_key", CLOUDINARY_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();

      return data.secure_url;
    } catch (error) {
      console.error(error);
      alert("failed to upload");
    }
  };

  const handleSubmit = async () => {
    console.log("logged user", user);
    try {
      const imgURL = await handleUpload();
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          about,
          avatar_image: imgURL,
          social_media_url,
          userId: user?.profile.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setName("");
        setAbout("");
        setAvatar_image("");
        setSocial_media_url("");
        return true;
      } else {
        alert("Error: " + data.error);
        return false;
      }
    } catch (error) {
      console.error("Fetch error:", error);
      return false;
    }
  };

  const validateForm = () => {
    const errors: {
      name?: string;
      about?: string;
      social_media_url?: string;
      photoPreview?: string;
    } = {};

    if (!avatar_image) {
      errors.photoPreview = "Please enter image";
    }
    if (!name) {
      errors.name = "Please enter name";
    }
    if (!about) {
      errors.about = "Please enter info about yourself";
    }
    if (!social_media_url) {
      errors.social_media_url = "Please enter a social link";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  useEffect(() => {
    if (user) {
      console.log("logged user:", user);
      route.push("/payment-details");
    }
    validateForm();
  }, [name, about, social_media_url, avatar_image, user]);

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
                  {avatar_image ? (
                    <Image
                      src={avatar_image || "/placeholder.svg"}
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
            onClick={handleSubmit}
            className="px-4 py-2 w-[15rem] h-10 "
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
