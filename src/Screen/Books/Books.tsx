import Book3D from "../../Components/Books/3D-Book"
import {
  BackCover,
  BookAuthor,
  BookContent,
  BookContentBox,
  BookShelf,
  BookTitle,
  Container,
  CoreJSCover,
  FrontCover,
  PageDescription,
  PageTitle,
  SpineTitle,
  SevenDBCover,
  NodeJSCover,
  OJTubeLink,
  OJTubeLogo,
  DeepWorkCover,
  MoneyCover,
  RedableCover,
  CODECover,
  NicoCover,
} from "./styles"

const Books: React.FC = () => {
  return (
    <Container>
      <PageTitle>3D Book Showcase</PageTitle>
      <PageDescription>
        제가 현재 관심있는 책, 읽고있는 책, 이미 읽은 책 등을 소개하는 페이지입니다.
      </PageDescription>
      <BookShelf src="images/shelf.png" />
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/core_js_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/core_js_back.jpg"></BackCover>}
        bookTitle="coreJS"
        spine={
          <CoreJSCover>
            <SpineTitle>코어 자바스크립트</SpineTitle>
          </CoreJSCover>
        }
        inside1={
          <BookContentBox>
            <BookTitle>코어 자바스크립트</BookTitle>
            <BookAuthor>정재남 저</BookAuthor>
            <BookContent>
              자바스크립트의 근간을 이루는 핵심 이론들을 정확하게 이해하는 것을 목표로 한다. 기본
              이론들 중 ES6에서도 중요성이 높은 핵심 개념을 위주로 다루며, 테크닉이나 요령보다는
              원리를 이해하는 데 목적을 두고 있다. 변수, 데이터, 불변성, 실행 컨텍스트와 스코프,
              호이스팅 등에 대해 다룬다.
            </BookContent>
          </BookContentBox>
        }
        inside2={
          <BookContentBox>
            <BookTitle>독서 후기</BookTitle>
            <BookContent>
              <em>
                이 책은 자바스크립트의 핵심적인 개념을 익히기에 딱 좋은 책이라고 생각합니다.
                <br />
              </em>
              저는 자바스크립트로 처음 개발 입문을 했습니다. JS로 이것 저것 만들고 싶은 것을 만들다
              보니, 왠만한 것은 JS로 구현 가능하겠다는 느낌이 온 시점이 있었습니다. 하지만 그 저변에
              깔려있는 기초에 대해서 아직 알지 못했고 주변에서 JS 기초에 관해 추천하는 책들 중 가장
              끌리는 책으로 이 책을 골랐습니다.
            </BookContent>
          </BookContentBox>
        }
        inside3={
          <BookContentBox>
            <BookContent>
              결론부터 말하자면 후회는 없었고 저처럼 구현에는 어느 정도 자신 있지만 기본이
              부족하다고 느끼는 분들은 고려해보시는 것도 좋다고 생각힙니다.
              <img src="/images/vanillajs.png" />
            </BookContent>
          </BookContentBox>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/seven_db_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/seven_db_back.jpg"></BackCover>}
        bookTitle="sevenDB"
        spine={
          <SevenDBCover>
            <SpineTitle>세븐 데이터베이스</SpineTitle>
          </SevenDBCover>
        }
        inside1={
          <BookContentBox>
            <BookTitle>세븐 데이터베이스</BookTitle>
            <BookAuthor>
              에릭 레드몬드 (Eric Redmond),
              <br /> 짐 R. 윌슨 (Jim R. Wilson) <br /> 공동 저술
              <br />
            </BookAuthor>
            <BookAuthor>옮긴이: 심재철</BookAuthor>
            <BookContent>
              PostgreSQL, Riak, HBase, MongoDB, CouchDB, Neo4J, Redis의 7개 데이터베이스들의 핵심
              개념과 기능을 구체적으로 소개한다. 또한, 데이터베이스들이 사용하는 ‘관계형’, ‘키/값’,
              ‘컬럼형’, ‘문서형’, ‘그래프형’ 5개의 데이터 모델을 자세히 알아볼 것이다. 더불어
              일관성과 가용성 간의 트레이드 오프를 이해하고, 언제 어떻게 사용하면 좋은지 보여준다.
            </BookContent>
          </BookContentBox>
        }
        inside2={
          <BookContentBox>
            <BookTitle>책소개</BookTitle>
            <BookContent>
              요즘은 어딜 가나 ‘빅 데이터’ 이야기다. 새로운 석유라고 일컬어지는 빅 데이터들을 도대체
              어디에 저장하고 어떻게 처리할 것인가? 여기서 7개 데이터베이스의 매력적인 기능과 완벽한
              쓰임새를 소개한다! 이 책에서는 PostgreSQL, Riak, HBase, MongoDB, CouchDB, Neo4J,
              Redis의 7개 데이터베이스들의 핵심 개념과 기능을 구체적으로 소개한다. 또한,
              데이터베이스들이 사용하는 ‘관계형’, ‘키/값’, ‘컬럼형’, ‘문서형’, ‘그래프형’ 5개의
              데이터 모델을 자세히 알아볼 것이다.
            </BookContent>
          </BookContentBox>
        }
        inside3={
          <BookContentBox>
            <BookContent>
              더불어 일관성과 가용성 간의 트레이드 오프를 이해하고, 언제 어떻게 사용하면 좋은지
              보여준다. 더불어 일관성과 가용성 간의 트레이드 오프를 이해하고, 언제 어떻게 사용하면
              좋은지 보여준다. 우리의 모든 요구를 한꺼번에 충족하는 데이터베이스를 선택하거나, 여러
              종류의 데이터베이스를 함께 사용하여 시너지 효과를 갖는 플랫폼을 만든다. NoSQL
              데이터베이스에 관한 친절한 설명과 흥미로운 예제 수록! MongoDB와 CouchDB의 눈에 띄는
              차이점은 무엇이며, 아마존 다이나모 기반인 Riak의 핵심은 무엇인지 살펴볼 것이다.
            </BookContent>
          </BookContentBox>
        }
        inside4={
          <BookContentBox>
            <BookContent>
              또한 Redis로 애플리케이션 실행이 더욱 빨라지게 만들고, Neo4J로 더 많은 데이터가
              연결되게 한다. 요즘 대두되고 있는 빅 데이터 문제들을 MapReduce를 사용해서 해결하고,
              아마존의 EC2같이 확장성 좋은 클라우드 서비스를 사용해서 서버 클러스터를 만들 것이다.
              각 데이터베이스가 어떤 영역의 문제에 가장 적합한지, 각각의 매력적인 기능들을 돋보이게
              해주는 실제 데이터 문제들을 살펴본다.
            </BookContent>
          </BookContentBox>
        }
      />{" "}
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/node_js_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/node_js_back.jpg"></BackCover>}
        bookTitle="CODE"
        spine={
          <NodeJSCover>
            <SpineTitle>
              N<br />o<br />d<br />e<br />
              j<br />s<br /> 프로그래밍
            </SpineTitle>
          </NodeJSCover>
        }
        inside1={
          <BookContentBox>
            <BookTitle>세븐 데이터베이스</BookTitle>
            <BookAuthor>김다니엘 저</BookAuthor>
            <BookContent>
              Node.js로 프로그래밍 하는 방법을 다양한 예제를 통해 설명한다. 내용은 크게 3장으로
              나뉘어 있으며, 각 장에서는 대표적인 주제에 따른 프로젝트 예제를 제공한다. 또한 주제는
              웹 애플리케이션, 소셜 웹 애플리케이션, 매시업 웹 애플리케이션, 그리고 사물인터넷
              애플리케이션으로 나뉘며 각 프로젝트의 설계 및 구현 과정에서 반드시 필요한 내용을
              설명한다.
            </BookContent>
          </BookContentBox>
        }
        inside2={
          <BookContentBox>
            <BookTitle>책소개</BookTitle>
            <BookContent>
              사물인터넷이 급속도로 발달하면서 이를 활용하기 위한 다양한 아이디어들이 쏟아져 나오고
              있다. 이러한 변화 속에서 가장 주목할 만한 점은 이와 관련된 사물인터넷 관련 웹
              애플리케이션, 매시업 애플리케이션 등이 다양한 가능성을 열어준다는 점이다. 이러한
              환경의 변화 속에 실제 관련 애플리케이션을 제작하는 데에 필수적인 Node.js를 실제 사례를
              통해 쉽게 배울 수 있는 책이 출간된 것을 누구보다 기쁘게 생각한다. 저자는 학부 전공이
              소프트웨어가 아니었기 때문에, 본인이 실무를 경험하면서 쌓아 올린
            </BookContent>
          </BookContentBox>
        }
        inside3={
          <BookContentBox>
            <BookContent>
              산 경험을 이 책에 고스란히 담았다. 이 책에는 프로그래밍 기법뿐만 아니라 Node.js가
              지니고 있는 프로젝트 관리 측면에서의 장점들이 곳곳에 드러나 있다. 각 단계마다 수록된
              실습 가능한 예제와 온라인 예제 등을 통해 학습 효과를 극대화시킬 수 있으리라 확신한다.
            </BookContent>
          </BookContentBox>
        }
        inside4={
          <BookContentBox>
            <BookContent>
              <img src="images/oj_sign.png" alt="" width="100%" height="100%" />
            </BookContent>
          </BookContentBox>
        }
        inside5={
          <BookContentBox>
            <BookContent>
              <h2>✨</h2>이 책은 오제이튜브 유튜브 채널에서 우연히 이벤트에 당첨되어 채널 주인장님의
              친필 사인이 담긴 책을 받아 알게 된 책입니다. 본인이 백엔드로는 현재까지 주로 Node.js를
              많이 사용했기 때문에 이론을 공부할 때 도움이 많이 될 것 같습니다.
              <OJTubeLink
                href="https://www.youtube.com/channel/UCIRh1Bvv_CigcP80H0ZCBUA"
                target="_blank"
              >
                {" "}
                <OJTubeLogo src="images/ojtube.png" />
              </OJTubeLink>
            </BookContent>
          </BookContentBox>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/nico_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/nico_back.jpg"></BackCover>}
        bookTitle="클론 코딩 영화 평점 웹서비스"
        spine={
          <NicoCover>
            <SpineTitle>클론 코딩 영화 평점 웹서비스</SpineTitle>
          </NicoCover>
        }
        inside1={
          <BookContentBox>
            <BookTitle>클론 코딩 영화 평점 웹서비스</BookTitle>
            <BookAuthor>니콜라스 저</BookAuthor>
            <BookTitle>책소개</BookTitle>
            <BookContent>
              처음부터 끝까지 액션을 따라 하면서 영화 평점 웹서비스를 클론 코딩할 수 있도록
              설계되었다. 액션은 어떤 명령어를 입력해야 하는지, 어디에 파일을 만들어야 하는지,
              어디를 수정해야 하는지 정확하게 지시하는 문장을 말한다. 액션만 따라 하면 내비게이션,
              영화 상세 정보, 리다이렉션 기능을 포함한 영화 평점 웹서비스가 만들어진다.
            </BookContent>
          </BookContentBox>
        }
        inside2={
          <BookContentBox>
            <BookContent>
              바로 어제 리액트를 시작한 사람도 편안하게 따라 할 수 있도록 실습 요소를 배치했다.
              코드를 작성하고 결과를 확인하는 일련의 과정을 스티커와 별색, 삭제선 등으로 구분해서
              표시했다. 여기에 주요한 개념은 킴조교의 보충 설명을 더했고, 혹시라도 놓칠 수 있는
              부분은 말풍선 등으로 한 번 더 강조해서 학습을 도왔다.
            </BookContent>
          </BookContentBox>
        }
        inside3={
          <BookContentBox>
            <BookContent>
              이 책을 구입했던 시점에는 이미 니꼬의 React 강의를 수강하고 프로젝트를 다 만들어본
              상태였지만 팬심 + 엄청난 이벤트 때문에 거부할 수 없었던 기억이 있다. 물론 책의 내용은
              정말 아무 것도 모르는 분이 봐도 잘 따라올 수 있게 구성되어 있고 직접 따라 만드는 걸
              유도하는 점이 매우 맘에들었다.
              <br />
              <em>ps. 니꼬 린 노마드코더 사랑해요 ㅋㅋㅋㅋㅋㅋ</em> 🧡💛💚💙💜💗
              <img width="100px" height="100px" src="/images/nomad_logo.jpg" />
            </BookContent>
          </BookContentBox>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/deepwork_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/deepwork_back.jpg"></BackCover>}
        bookTitle="deepWork"
        spine={
          <DeepWorkCover>
            <SpineTitle>딥 워크</SpineTitle>
          </DeepWorkCover>
        }
      />{" "}
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/money_history_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/money_history_back.jpg"></BackCover>}
        bookTitle="moneyHistory"
        spine={
          <MoneyCover>
            <SpineTitle>돈의 역사</SpineTitle>
          </MoneyCover>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/readable_code_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/readable_code_back.jpg"></BackCover>}
        bookTitle="readableCode"
        spine={
          <RedableCover>
            <SpineTitle>읽기 좋은 코드가 좋은 코드다</SpineTitle>
          </RedableCover>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/code_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/code_back.jpg"></BackCover>}
        bookTitle="CODE"
        spine={
          <CODECover>
            <SpineTitle>
              C<br />O<br />D<br />E<br />
            </SpineTitle>
          </CODECover>
        }
      />
    </Container>
  )
}

export default Books
