import Bonmun from "@/components/Bonmun";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Offcanvas from "@/components/Offcanvas";
import SidebarButton from "@/components/SidebarButton";

const SlidePuzzle = () => {
  const _dir=`bg-[url(/img/matilda.png)]`;
  return (
    <main className="relative min-h-screen">
      <Header title={"Slide Puzzle"}/>
      <Offcanvas />

      <Sidebar>
        <SidebarButton title={"슬라이드 퍼즐"} />
      </Sidebar>
      
      <div className="p-4 sm:mr-32 2xl:mx-48 md:px-24 lg:px-36 xl:px-60 py-6 px-6">
        <Bonmun title="슬라이드 퍼즐">
          슬라이드 퍼즐
        </Bonmun>
      </div>
    </main>
  );
};

export default SlidePuzzle;