import ThreeCanvas from "@/components/ThreeCanvas";
import Bonmun from "@/components/Bonmun";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Offcanvas from "@/components/Offcanvas";
import SidebarButton from "@/components/SidebarButton";

const Home = () => {
  const _dir=`bg-[url(/img/matilda.png)]`;
  return (
    <main className="relative min-h-screen">
      <Header title={"MindulPage"}/>
      <Offcanvas />
      <Sidebar>
        <SidebarButton title={"민둘페이지"} />
        <SidebarButton title={"목차"} />
        <SidebarButton title={"민둘봇"} />
        <SidebarButton title={"마틸다"} />
        <SidebarButton title={"VI-828583"} />
        <SidebarButton title={"슬라이드퍼즐"} />
        <SidebarButton title={"코테공부자료"} />
      </Sidebar>
      
      <div className="p-4 sm:mr-32 2xl:mx-48 md:px-24 lg:px-36 xl:px-60 py-6 px-6">
        <Bonmun title="민둘페이지">
          이곳은 민둘페이지입니다.<br/>
          민둘이가 제작한 프로젝트를 소개하는 페이지입니다.<br/>
        </Bonmun>

        <Bonmun title="목차">
          민둘페이지에서 볼 수 있는 프로젝트는 아래와 같습니다.<br/><br/>
          1. 민둘봇<br/>
          2. 마틸다<br/>
          3. VI-828583<br/>
          4. 슬라이드퍼즐<br/>
          5. 코테공부자료<br/><br/>
          아래에서 해당 프로젝트를 간략히 소개하고 있으며, 오른쪽 상단의 메뉴를 통해 해당 프로젝트에 대해 자세한 설명을 확인할 수 있습니다.
        </Bonmun>

        <Bonmun title="민둘봇">
          디스코드 채널에서 사용할 수 있는 노래봇, 민둘봇입니다!<br/>
          민둘맨둘한 개발자 민둘이가 디스코드를 사용하다가 심심해서 만든 봇이에요.<br/>
          그런데 생각보다 어렵다는 것을 깨달으며, 호되게 당하는 중입니다.<br/>
          여러 버그가 많이 있는 멍청한 봇이지만, 항상 모든 방면에서 더 나아지려고 노력하고 있는 민둘이같은 봇입니다~ <br/>
        </Bonmun>

        <Bonmun title="마틸다">
          마틸다(MATILDA)는 2022년 서울시립대학교 소프트웨어 공학 연구실(UOS SELAB)에서 진행한 학부연구생 프로젝트입니다.<br/>
          2D 이미지 파일을 NFT 3D 패션 아이템으로 변환하여 거래할 수 있는 웹 애플리케이션입니다.
        </Bonmun>

        <Bonmun title="VI-828583">
          해당 프로젝트는 한국 게임메이커 커뮤니티 KGMC에서 주최했던, [제 6회 CGM 게임잼] 출품작입니다.<br/>
          2D 디펜스게임으로 제작되었으며, 스테이지 5단계를 모두 클리어하면 승리하는 게임입니다.<br/>
        </Bonmun>

        <Bonmun title="슬라이드퍼즐">
          2021년도 MicroProcessor 응용실습 수업 최종 과제 자료입니다.<br/>
          1인 과제로 슬라이드 퍼즐을 제작했습니다.<br/>
          해당 프로젝트는 C와 JAVA를 이용해 개발했으며, C를 이용해 GPU 가속을 통한 퍼즐 제작, JAVA를 이용해 애플리케이션 개발을 담당했습니다.<br/>
          그리고 이를 JNI를 이용해 C로부터 계산된 퍼즐의 정보를 JAVA로 넘겨 애플리케이션 화면에 띄워줄 수 있도록 구현했습니다.<br/>
        </Bonmun>

        <Bonmun title="코테공부자료">
          코딩테스트 공부했던 자료를 보여줍니다.
        </Bonmun>
        
      </div>
      {/* <ThreeCanvas/> */}
    </main>
  );
};

export default Home;