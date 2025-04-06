import { Header } from "@/app/_components/Header";
import { LeftMenu } from "@/components/LeftMenu";

const ViewPage = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col justify-center relative ">
      <Header />
      <div className="flex absolute top-24 left-12">
        <LeftMenu />
        <div className="w-[59.688rem] h-[61.625rem] border border-amber-400 "></div>
      </div>
    </div>
  );
};

export default ViewPage;
