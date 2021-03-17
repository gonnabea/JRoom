import styled from "styled-components"
import Book3D from "../Components/Books/3D-Book"

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/images/wood.jpg");
`

const FrontCover = styled.img`
  background-color: white;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`

const BackCover = styled.img`
  background-color: white;
  width: 100%;
  height: 100%;
`

const BookShelf = styled.img`
  width: 70%;
  height: 100%;
  position: absolute;

  height: 63px;
  margin-top: 230px;
  padding-right: 40px; // 중앙 절렬을 위함
`

const SpineTitle = styled.h2`
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  width: 50%;
`

const PageTitle = styled.h1`
  position: absolute;
  top: 2%;
  left: 20%;
`

const PageDescription = styled.p`
  position: absolute;
  top: 10%;
  left: 20%;
  font-size: 15px;
`

const CoreJSCover = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DeepWorkCover = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CODECover = styled.div`
  background-color: #80b3ff;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MoneyCover = styled.div`
  background-color: #ff924a;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SevenDBCover = styled.div`
  background-color: #bdd3b9;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RedableCover = styled.div`
  background-color: #439877;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BookContentBox = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  backface-visibility: hidden;
  padding: 20px;
`

const BookTitle = styled.h2`
  font-family: fantasy;
`

const BookAuthor = styled.span`
  font-size: 13px;
  line-height: 20px;
`

const BookContent = styled.p`
  font-size: 12px;
  line-height: 30px;
  font-weight: 300;
`

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
            </BookContent>
            <img src="/images/vanillajs.png" />
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
