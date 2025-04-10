export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
};
export type ProfileType = {
  id: number;
  name: string;
  about: string;
  avatar_image: string;
  social_media_url: string;
};

export type Bank_Card = {
  id: number;
  country: string;
  first_name: string;
  last_name: string;
  card_number: string;
  expiry_date: string;
};
export type UserFullInfoType = {
  userid: number;
  username: string;
  email: string;
  password: string;
};
