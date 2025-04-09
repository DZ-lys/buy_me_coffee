import { ReactNode } from "react";
import { ProfileProvider } from "../_context/CreateProfile";
import { CardProvider } from "../_context/PaymentDetails";

type Props = {
  children: ReactNode;
};

const ProfileLayout = (props: Props) => {
  return (
    <ProfileProvider>
      <CardProvider>{props.children}</CardProvider>
    </ProfileProvider>
  );
};

export default ProfileLayout;
