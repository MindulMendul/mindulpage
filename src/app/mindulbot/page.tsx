import BackButton from "@/components/backButton";
import Header from "@/components/header";

export const MindulBot = () => {
  const _dir=`bg-[url('/img/mindul.png')]`;
  return (
    <main className="page">
      <Header dir={_dir} title={"Mindul Bot"}/>
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
        <BackButton/>
        <BackButton/>
      </div> 
    </main>
  );
};

export default MindulBot;