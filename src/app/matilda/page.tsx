import Bonmun from "@/components/Bonmun";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Offcanvas from "@/components/Offcanvas";
import SidebarButton from "@/components/SidebarButton";
import Youtube from "@/components/youtube";

const Matilda = () => {
  const _dir=`bg-[url(/img/matilda.png)]`;
  return (
    <main className="relative min-h-screen">
      <Header dir={_dir} title={"MATILDA"}/>
      <Offcanvas />

      <Sidebar>
        <SidebarButton title={"마틸다"} />
        <SidebarButton title={"기능"} />
        <SidebarButton title={"특이사항"} />
      </Sidebar>
      
      <div className="p-4 sm:mr-32 2xl:mx-48 md:px-24 lg:px-36 xl:px-60 py-6 px-6">
        <Bonmun title="마틸다">
          MATILDA<br/>
          Machine learning And non-fungible Token, Image to Clothes Design Application<br/><br/>
          마틸다(MATILDA)는 2022년 서울시립대학교 소프트웨어 공학 연구실(UOS SELAB)에서 진행한 학부연구생 프로젝트입니다.<br/>
          2D 이미지 파일을 NFT 3D 패션 아이템으로 변환하여 거래할 수 있는 웹 애플리케이션입니다.
        </Bonmun>

        <Bonmun title="기능">
          서버 호스팅 비용 문제로 인해 현재는 서비스하고 있지 않습니다.<br/>
          다만 해당 프로젝트는 유튜브를 통해 기능을 확인할 수 있습니다.<br/><br/>
          <Youtube videoId="CYEf6tfHork"/>
        </Bonmun>

        <Bonmun title="특이사항">
          서버 호스팅 비용 문제로 인해 현재는 서비스하고 있지 않습니다.<br/>
          다만 해당 프로젝트는 유튜브를 통해 기능을 확인할 수 있습니다.<br/>
        </Bonmun>
      </div>
    </main>
  );
};

export default Matilda;