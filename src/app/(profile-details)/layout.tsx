import { ReactNode } from "react";
import { ProfileProvider } from "../_context/CreateProfile";
import { CardProvider } from "../_context/PaymentDetails";
import { LogInProvider } from "../_context/UserLogIn";

type Props = {
  children: ReactNode;
};

const ProfileLayout = (props: Props) => {
  return (
    <LogInProvider>
      <ProfileProvider>
        <CardProvider>{props.children}</CardProvider>
      </ProfileProvider>
    </LogInProvider>
  );
};

export default ProfileLayout;
