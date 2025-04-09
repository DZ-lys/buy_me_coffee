import { ReactNode } from "react";
import { LeftLayout } from "../_components/LeftSide";
import { NameProvider } from "../_context/UserName";
import { EmailProvider } from "../_context/UserEmail";
import { LogInProvider } from "../_context/UserLogIn";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <NameProvider>
      <EmailProvider>
        <LogInProvider>
          <div className="flex justify-between w-[100%] h-[100%] ">
            <LeftLayout />
            {props.children}
          </div>
        </LogInProvider>
      </EmailProvider>
    </NameProvider>
  );
};

export default Layout;
