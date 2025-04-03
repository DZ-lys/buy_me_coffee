"use client";
import { useRouter } from "next/navigation";
import { Header } from "../../_components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, XCircle } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const createProfile = () => {
  const [displayName, setDisplayName] = useState("");
  const [about, setAbout] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState<{
    displayName?: string;
    about?: string;
    url?: string;
    photoPreview?: string;
  }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState(null);

  const PRESET_NAME = "buy_me_coffee";
  const CLOUDINARY_NAME = "da889nybx";

  useEffect(() => {
    validateForm();
  }, [displayName, about, url, photoPreview]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (!file) {
      return;
    }
    formData.append("photo", file);
    formData.append("upload_preset", PRESET_NAME);
    formData.append("api_key", CLOUDINARY_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImage(data.secure_url);
    } catch (error) {
      console.error(error);
      alert("failed to upload");
    }
  };

  const validateForm = () => {
    let errors: {
      displayName?: string;
      about?: string;
      url?: string;
      photoPreview?: string;
    } = {};

    if (!photoPreview) {
      errors.photoPreview = "Please enter image";
    }
    if (!displayName) {
      errors.displayName = "Please enter name";
    }
    if (!about) {
      errors.about = "Please enter info about yourself";
    }
    if (!url) {
      errors.url = "Please enter a social link";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const route = useRouter();

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
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
          </div>
          {errors.photoPreview && (
            <div className="flex gap-1 items-center">
              {" "}
              <XCircle className="text-red-400 w-5 h-5" />
              <p className="text-red-400 w-52">{errors.photoPreview}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 mt-16">
          <Label>Name</Label>
          <Input
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            placeholder="Enter your name here"
            className="py-2 px-3  "
          />
          {errors.displayName && (
            <div className="flex gap-1 items-center">
              {" "}
              <XCircle className="text-red-400 w-5 h-5" />
              <p className="text-red-400">{errors.displayName}</p>
            </div>
          )}
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

          {errors.about && (
            <div className="flex gap-1 items-center">
              {" "}
              <XCircle className="text-red-400 w-5 h-5" />
              <p className="text-red-400">{errors.about}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Label>Social media URL</Label>
          <Input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            placeholder="https://"
          />
          {errors.url && (
            <div className="flex gap-1 items-center">
              {" "}
              <XCircle className="text-red-400 w-5 h-5" />
              <p className="text-red-400">{errors.url}</p>
            </div>
          )}
        </div>
        <div className=" w-[31.875rem] h-10 flex justify-end ">
          <Button
            disabled={!isFormValid}
            onClick={async () => {
              await handleUpload();
              route.push("/payment-details");
            }}
            type="submit"
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
