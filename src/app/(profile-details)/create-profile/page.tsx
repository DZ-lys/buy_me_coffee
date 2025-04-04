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
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [social_media_url, setSocial_media_url] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File>();
  const [avatar_image, setAvatar_image] = useState("");

  const [errors, setErrors] = useState<{
    name?: string;
    about?: string;
    social_media_url?: string;
    photoPreview?: string;
  }>({});

  const PRESET_NAME = "buy_me_coffee";
  const CLOUDINARY_NAME = "da889nybx";

  useEffect(() => {
    validateForm();
  }, [name, about, social_media_url, photoPreview]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
    let errors: {
      name?: string;
      about?: string;
      social_media_url?: string;
      photoPreview?: string;
    } = {};

    if (!photoPreview) {
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

  const route = useRouter();

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
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter your name here"
            className="py-2 px-3  "
          />
          {errors.name && (
            <div className="flex gap-1 items-center">
              {" "}
              <XCircle className="text-red-400 w-5 h-5" />
              <p className="text-red-400">{errors.name}</p>
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
            value={social_media_url}
            onChange={(e) => {
              setSocial_media_url(e.target.value);
            }}
            placeholder="https://"
          />
          {errors.social_media_url && (
            <div className="flex gap-1 items-center">
              {" "}
              <XCircle className="text-red-400 w-5 h-5" />
              <p className="text-red-400">{errors.social_media_url}</p>
            </div>
          )}
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
