import Header from "@/components/header";
import NavBar from "@/components/NavBar";

export const MindulBot = () => {
  const _dir=`bg-[url('/img/mindul.png')]`;
  return (
    <main className="page">
      <Header dir={_dir} title={"Mindul Bot"}/>
      <NavBar />
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-1 bg-gray-200">
          <div className="text-center text-bold">
            항목1
          </div>
          <div className="text-center text-bold">
            항목2
          </div>
        </div>
        <div className="col-span-3">
          <div className="my-6">
            <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-black md:text-3xl lg:text-4xl">
              민둘봇 개발했다는 내용 1
            </h1>
            <p>
              민둘봇 개발했다는 상세내용 1 민둘봇 개발했다는 상세내용 1 민둘봇 개발했다는 상세내용 1민둘봇 개발했다는 상세내용 1 민둘봇 개발했다는 상세내용 1 민둘봇 개발했다는 상세내용 1
            </p>
          </div>
          <div className="my-6">
            <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-black md:text-3xl lg:text-4xl">
              민둘봇 개발했다는 내용 2
            </h1>
            <p>
              민둘봇 개발했다는 상세내용 2
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MindulBot;