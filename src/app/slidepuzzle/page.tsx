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
        <SidebarButton title={"실행방식"} />
        <SidebarButton title={"하드웨어"} />
      </Sidebar>
      
      <div className="p-4 sm:mr-32 2xl:mx-48 md:px-24 lg:px-36 xl:px-60 py-6 px-6">
        <Bonmun title="슬라이드 퍼즐">
          2021년도 MicroProcessor 응용실습 수업 최종 과제 자료입니다.<br/>
          1인 과제로 슬라이드 퍼즐을 제작했습니다.<br/>
          해당 프로젝트는 C와 JAVA를 이용해 개발했으며, C를 이용해 GPU 가속을 통한 퍼즐 제작, JAVA를 이용해 애플리케이션 개발을 담당했습니다.<br/>
          그리고 이를 JNI를 이용해 C로부터 계산된 퍼즐의 정보를 JAVA로 넘겨 애플리케이션 화면에 띄워줄 수 있도록 구현했습니다.<br/>
          <a href="https://github.com/MindulMendul/SlidePuzzle">https://github.com/MindulMendul/SlidePuzzle</a>
        </Bonmun>
        <Bonmun title="실행방식">
          프로그램의 실행방식은 다음과 같습니다.<br/><br/>
          1. JAVA를 이용한 슬라이드 퍼즐 구현<br/>
          2. JNI를 통해 C에서 슬라이드퍼즐 정보를 다룰 수 있도록 함<br/>
          3. C에서 커널로 변경해야 할 퍼즐이미지 정보를 전달함<br/>
          4. 커널에서 GPU를 통한 연산을 수행<br/>
          5. 수행한 결과를 커널에서 C로 정보를 전달함<br/>
          6. 전달받은 정보를 JNI를 통해 JAVA 코드로 변환<br/>
          7. JAVA를 이용한 애플리케이션 화면 구성<br/><br/>
          SlidePuzzle.cl 파일을 통해 GPU를 통한 연산이 어떻게 이뤄지는지 확인할 수 있습니다.<br/>
          교환되는 슬라이드퍼즐 정보는 1부터 N*N 까지 순서대로 주어진 N by N 행렬의 값이고, src로부터 받은 사진의 RGBA 정보와 퍼즐정보를 조합하여 섞여진 슬라이드퍼즐 정보를 dst로 출력합니다.
        </Bonmun>
        <Bonmun title="하드웨어">
          실습에 사용된 HW는 한백 peripheral module(m2)이고, SW에서 사용한 HW 종류는<br/><br/>
          1. CAMERA<br/>
          2. LED<br/>
          3. 7-segment<br/>
          4. GPIO<br/>
          5. 디스플레이<br/><br/>
          총 5가지입니다.<br/>
          해당 기능은 각각 src/main 폴더에서 각각의 c와 java파일로 구현되어있는 것을 확인할 수 있습니다.
        </Bonmun>
      </div>
    </main>
  );
};

export default SlidePuzzle;