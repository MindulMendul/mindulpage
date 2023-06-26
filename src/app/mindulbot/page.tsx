import Bonmun from "@/components/Bonmun";
import Button from "@/components/Button";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";

const MindulBot = () => {
  const _dir=`bg-[url('/img/mindul.png')]`;
  return (
    <main>
      <SideBar />
      <Header dir={_dir} title={"Mindul Bot"}/>
      <BonmunMindul />
    </main>
  );
};

export default MindulBot;

const BonmunMindul = () => {
  return (
    <div>
      <NavBar />
      <div className="w-fit p-4 max-sm:mr-12 mr-48 lg:px-24 py-12 px-6">
        <Bonmun tite="민둘봇">
          <p>
            디스코드 채널에서 사용할 수 있는 봇, 민둘봇입니다!<br/>
            민둘맨둘한 개발자 민둘이가 디스코드를 사용하다가 심심해서 만든 봇이에요.<br/>
            그런데 생각보다 어렵다는 것을 깨달으며, 호되게 당하는 중입니다.<br/>
            여러 버그가 많이 있는 멍청한 봇이지만, 항상 모든 방면에서 더 나아지려고 노력하고 있는 민둘이같은 봇입니다~ (자화자찬~^^7) <br/>
          </p>
        </Bonmun>

        <Bonmun title="사용법">
          <p>
            민둘봇은 디스코드 방에 초대해야만 사용가능합니다!<br/>
            해당 링크에 들어가서 원하는 디스코드 방에 초대할 수 있습니다.<br/><br/>
            <Button title={"민둘봇 초대하기"} dir={"https://discord.com/oauth2/authorize?client_id=751733763838443530&scope=bot"}/><br/>
          </p>
        </Bonmun>

        <Bonmun title="명령어">
          <p>
            명령어는 이런 것들이 있어요. 명령어 전에는 한글 &quot;ㅏ&quot; 를 입력하세요! 노래명령어를 원하신다면 따로 &quot;노래도움말&quot; 명령어로 제공하고 있으니 참고해주세요.<br/><br/>
            <span className="text-xl font-bold">민둘</span> 민둘이에 대해서 대답해요. 그런데 화내면 앞에 말했던 것들을 수정해요. (숨은 명령어)<br/>
            <span className="text-xl font-bold">주사위</span> 1부터 6까지 정수 중에 하나를 말해줘요!<br/>
            <span className="text-xl font-bold">타로</span> 오늘의 운세를 봐줘요.<br/>
            <span className="text-xl font-bold">건의</span> 민둘봇에게 말하고 싶은 게 있으면 건의해주세요. 의견 참고해서 반영할 수 있도록 하겠습니다 ㅎㅎ<br/>
          </p>
        </Bonmun>

        <Bonmun title="노래명령어">
          <p>
            명령어는 이런 것들이 있어요. 명령어 전에는 한글 &quot;ㅏ&quot; 를 입력하세요! 모든 노래봇 기능은 유튜브 영상을 기준으로 재생합니다. 일반명령어를 원하신다면 따로 &quot;도움말&quot; 명령어로 제공하고 있으니 참고해주세요.<br/><br/>
            <span className="text-xl font-bold">노래</span> 유튜브 주소를 입력하면 돼요! 귀찮다면 그냥 듣고 싶은 노래 제목만 치면 직접 검색해서 제일 위에 있는 노래로 틀어요.<br/>
            <span className="text-xl font-bold">검색</span> 노래 명령어의 검색기능 확장형이에요. 유튜브에 검색한 것과 동일한 목록을 보여줍니다. 그 후에 숫자를 입력하면 그에 해당하는 노래도 틀어드려요!<br/>
            <span className="text-xl font-bold">스킵</span> 재생 중인 노래를 넘기고 다음 노래로 넘어갑니다. 넘어간 노래는 다시 주워담을 수 없어요!<br/>
            <span className="text-xl font-bold">비우기</span> 노래 목록을 다 날려버립니다.<br/>
            <span className="text-xl font-bold">삭제</span> 노래 목록에서 빼고 싶은 녀석을 빼는 기능이에요. 역시 검색 명령어처럼 숫자를 입력하시면 됩니다.<br/>
            <span className="text-xl font-bold">큐</span> 현재 재생 중인 노래와 대기중인 노래의 목록을 보여줍니다.<br/>
            <span className="text-xl font-bold">볼륨</span> 현재 재생 중인 노래의 소리를 조절합니다.<br/>
          </p>
        </Bonmun>

        <Bonmun title="개발환경">
          <p>
            주 개발 언어 : TypeScript<br/>
            사용하는 모듈<br/>
            1. discord.js<br/>
            2. axios<br/>
            3. dotenv<br/>
            4. nodemon<br/>
            5. play-dl<br/>
          </p>
        </Bonmun>
      </div>
    </div>
  );
}