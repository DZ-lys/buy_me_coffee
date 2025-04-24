export type User_Type = {
  id: number;
  username: string;
  email: string;
  password: string;
  profile: Profile_Type;
  bank_card: Bank_Card_Type;
};
export type Profile_Type = {
  id: number;
  name: string;
  about: string;
  avatar_image: string;
  social_media_url: string;
  user_id: number;
};

export type Bank_Card_Type = {
  id: number;
  country: string;
  first_name: string;
  last_name: string;
  card_number: string;
  expiry_date: string;
  cvc: number;
  user_id: number;
};
