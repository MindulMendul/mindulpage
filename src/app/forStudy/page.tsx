import Bonmun from "@/components/Bonmun";
import Header from "@/components/Header";
import Sidebar, { SidebarButton } from "@/components/Sidebar";
import Offcanvas from "@/components/Offcanvas";

const ForStudy = () => {
  return (
    <main className="relative min-h-screen">
      <Offcanvas />
      <Header title={"STUDY"}/>
      <Sidebar>
        <SidebarButton title={"스터디"} />
      </Sidebar>
      
      <div className="p-4 sm:mr-32 2xl:mx-48 md:px-24 lg:px-36 xl:px-60 py-6 px-6">
        <Bonmun title="스터디">
          스터디
        </Bonmun>
      </div>
    </main>
  );
};

export default ForStudy;