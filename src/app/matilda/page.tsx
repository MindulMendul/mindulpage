import Bonmun from "@/components/Bonmun";
import Header from "@/components/Header";
import Sidebar, { SidebarButton } from "@/components/Sidebar";
import Offcanvas from "@/components/Offcanvas";

const Matilda = () => {
  const _dir=`bg-[url(/img/matilda.png)]`;
  return (
    <main className="relative min-h-screen">
      <Header dir={_dir} title={"MATILDA"}/>
      <Offcanvas />

      <Sidebar>
        <SidebarButton title={"마틸다"} />
      </Sidebar>
      
      <div className="p-4 sm:mr-32 2xl:mx-48 md:px-24 lg:px-36 xl:px-60 py-6 px-6">
        <Bonmun title="마틸다">
          마틸다
        </Bonmun>
      </div>
    </main>
  );
};

export default Matilda;