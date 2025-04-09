"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextType {
  name: string;
  about: string;
  social_media_url: string;
  avatar_image: string;
  errors: {
    name?: string;
    about?: string;
    social_media_url?: string;
    photoPreview?: string;
  };
  isFormValid: boolean;
  handleSubmit: () => Promise<boolean>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAbout: React.Dispatch<React.SetStateAction<string>>;
  setSocial_media_url: React.Dispatch<React.SetStateAction<string>>;
  setAvatar_image: React.Dispatch<React.SetStateAction<string>>;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photoPreview: string | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const useCreateProfile = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useRegisterEmail must be used within a UserProvider");
  }
  return context;
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
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

  useEffect(() => {
    validateForm();
  }, [name, about, social_media_url, photoPreview]);

  const PRESET_NAME = "buy_me_coffee";
  const CLOUDINARY_NAME = "da889nybx";

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
  return (
    <UserContext.Provider
      value={{
        name,
        about,
        social_media_url,
        avatar_image,
        errors,
        isFormValid,
        handleSubmit,
        setName,
        setAbout,
        setSocial_media_url,
        setAvatar_image,
        handlePhotoChange,
        photoPreview,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
