import { ReactNode } from "react";
import { LeftLayout } from "../_components/LeftSide";

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="flex justify-between w-[100%] h-[100%] ">
      <LeftLayout />
      {props.children}
    </div>
  );
};

export default Layout;
