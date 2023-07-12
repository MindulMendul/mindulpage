import Bonmun from "@/components/Bonmun";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Offcanvas from "@/components/Offcanvas";
import SidebarButton from "@/components/SidebarButton";

const ForStudy = () => {
  return (
    <main className="relative min-h-screen">
      <Offcanvas />
      <Header title={"Coding Test"}/>
      <Sidebar>
        <SidebarButton title={"코테공부자료"} />
      </Sidebar>
      
      <div className="p-4 sm:mr-32 2xl:mx-48 md:px-24 lg:px-36 xl:px-60 py-6 px-6">
        <Bonmun title="코테공부자료">
          해당 페이지는 코딩 테스트 공부자료를 업로드할 예정입니다.<br/>
        </Bonmun>
      </div>
    </main>
  );
};

export default ForStudy;