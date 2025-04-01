import { UserType } from "@/utils/types/type";

export const getUser = async (): Promise<UserType[]> => {
  return [
    {
      _id: "1234",
      username: "Duk",
      email: "example@gmail.com",
      password: "123456",
    },
  ];
};
