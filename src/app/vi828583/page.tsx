import Bonmun from "@/components/Bonmun";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Offcanvas from "@/components/Offcanvas";
import SidebarButton from "@/components/SidebarButton";

const VI828583 = () => {
  const _dir=`bg-[url(/img/matilda.png)]`;
  return (
    <main className="relative min-h-screen">
      <Header title={"VI-828583"}/>
      <Offcanvas />

      <Sidebar>
        <SidebarButton title={"VI-828583"} />
        <SidebarButton title={"조작방법"} />
      </Sidebar>
      
      <div className="p-4 sm:mr-32 2xl:mx-48 md:px-24 lg:px-36 xl:px-60 py-6 px-6">
        <Bonmun title="VI-828583">
          해당 프로젝트는 한국 게임메이커 커뮤니티 KGMC에서 주최했던, [제 6회 CGM 게임잼] 출품작입니다.<br/>
          2D 디펜스게임으로 제작되었으며, 스테이지 5단계를 모두 클리어하면 승리하는 게임입니다.<br/>
          플레이시간은 20분 전후로 예상하고, 조금 어려울 것으로 예상합니다.
        </Bonmun>

        <Bonmun title="조작법">
          1. 일종의 2d 슈팅게임이며, 총 5 스테이지가 있습니다.<br/>
          2. 플레이어는 키보드 방항키로 움직이며, 움직인 방향으로 공격을 합니다.<br/>
          3. working percent 라고 적힌 게이지바가 100이 되면 게임에서 지게 되며, 지게 되면 그 스테이지를 다시 시작합니다.<br/>
          4. 적들은 플레이어가 있는 필드를 기준으로 왼쪽에서 오른쪽으로 나옵니다.<br/>
          5. 적은 오른쪽의 끝에 닿으면 working percent 게이지바가 상승하며, 빨갛고 세모난 적은 플레이어와 부딪힐 때 게이지바가 상승합니다. 보스는 닿으면 게임에서 집니다.<br/>
          6. 적을 없애면 working percent 가 조금 줄어듭니다.<br/>
          7. 적들과 부딪히면 플레이어는 잠시 공격을 멈춥니다.<br/>
          8. 능력이 안되어 게임을 잠시 멈추는 걸 만들지 못했습니다.<br/>
          9. 게임을 끄려면 윈도우 창의 x 버튼을 사용하거나 esc 버튼을 사용하세요.<br/>
        </Bonmun>
      </div>
    </main>
  );
};

export default VI828583;