import { useRef, useState } from "react"
import WikiContentBox from "../../Components/Documents/WikiContentBox"
import WikiDictionary from "../../Components/Documents/WikiDictionary"

import WikiGreeting from "../../Components/Documents/WikiGreeting"
import WikiHeader from "../../Components/Documents/WikiHeader"
import WikiSidebar from "../../Components/Documents/WikiSidebar"
import {
  Container,
  ContentArea,
  ContentMainArea,
  ExplorerLink,
  ExplorerModal,
  MainArea,
} from "./styles/common-styles"
import Header from "../../Components/Header"

const Backend: React.FC = () => {
  const [content, setContent] = useState<JSX.Element | null>(null) // 모달에 들어갈 내용 설정
  const explorerModal = useRef<HTMLDivElement | null>(null)

  // 키워드 탐색기 실행
  const handleExplorer = (keyword: string) => {
    setContent(WikiDictionary(keyword))
  }

  return (
    <Container>
      <Header title="Wiki" />
      <ExplorerModal ref={explorerModal}>{content}</ExplorerModal>
      <WikiSidebar
        menus={[
          "Node.js",
          "Express.js",
          "Nest.js",
          "MongoDB",
          "MySQL",
          "PostgresQL",
          "Passport.js",
          "JWT Login",
          "Python",
          "Flask",
          "GraphQL",
          "Jest",
        ]}
      />
      <MainArea>
        <WikiHeader />
        <ContentArea>
          <WikiGreeting
            title="Jiwon의 백엔드 관련 CS 지식입니다."
            msg={`제가 만든 프로젝트들을 기점으로 얻을 수 있는 Computer Science 지식들을 정리해 놓은
              페이지입니다.
            내용은 지속적으로 추가될 것입니다.`}
          />
          <ContentMainArea>
            <WikiContentBox
              title="nodejs의 non-blocking io 모델이 정확히 무엇일까?"
              sort="Node.js"
              text={
                <div>
                  Node.js는 싱글스레드 논블로킹 모델로 구성되어 있습니다. 하나의{" "}
                  <ExplorerLink onClick={() => handleExplorer("스레드")}>스레드</ExplorerLink>로
                  동작하지만, 비동기 I/O 작업을 통해 요청들을 서로 블로킹하지 않습니다. 즉, 동시에
                  많은 요청들을 비동기로 수행함으로써 싱글스레드일지라도 논블로킹이 가능합니다. 또한
                  Node.js는{" "}
                  <ExplorerLink onClick={() => handleExplorer("클러스터링")}>
                    클러스터링
                  </ExplorerLink>
                  을 통해{" "}
                  <ExplorerLink onClick={() => handleExplorer("프로세스")}>프로세스</ExplorerLink>{" "}
                  <ExplorerLink onClick={() => handleExplorer("포크")}>포크</ExplorerLink>(fork)하여
                  멀티스레드인것 처럼 사용될 수 있습니다. 트래픽에 따라서 프로세스를 포크할 수
                  있으므로 서버의 확장성이 용이하다는 장점을 갖습니다.
                </div>
              }
              imageSrc="https://buddy.works/guides/covers/test-nodejs-app/share-nodejs-logo.png"
            />
            <WikiContentBox
              title="nodejs의 작동 원리 중 이벤트 기반 (Event-Driven) 방식이 정확히 무엇일까?"
              sort="Node.js"
              text={
                <div>
                  이벤트 기반(Event-driven)이란 이벤트가 발생할 때 미리 지정해둔 작업을 수행하는
                  방식을 의미합니다. Node.js는 이벤트 리스너에 등록해둔 콜백함수를 실행하는 방식으로
                  동작합니다. <br />
                  <em>router.get('/', (req,res,next)={">"}</em> <br />* 흔히 사용하고 있는 router도
                  이벤트 기반으로 동작하고 있습니다.
                </div>
              }
              imageSrc="https://buddy.works/guides/covers/test-nodejs-app/share-nodejs-logo.png"
            />
            <WikiContentBox
              title="Cookie-Session Login이 뭘까?"
              sort="Passport.js"
              text={
                <div>
                  클라이언트에서 회원 가입할 때 유저정보 ( username, password ) 전달 ={">"} 서버에
                  요청 ={">"} 서버가{" "}
                  <ExplorerLink onClick={() => handleExplorer("세션")}>세션</ExplorerLink>에 유저
                  정보를 저장 ={">"} 해당 세션의 ID를 클라이언트의{" "}
                  <ExplorerLink onClick={() => handleExplorer("쿠키")}>쿠키</ExplorerLink>에 전달 =
                  {">"} 서버에 요청을 할 때마다 쿠키에 담겨있는 세션 ID를 서버에 전달하여 로그인
                  상태 유지.
                </div>
              }
              imageSrc="https://buddy.works/guides/covers/test-nodejs-app/share-nodejs-logo.png"
            />
          </ContentMainArea>
        </ContentArea>
      </MainArea>
    </Container>
  )
}

export default Backend
