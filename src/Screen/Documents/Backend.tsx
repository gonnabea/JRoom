import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import WikiContentBox from "../../Components/Documents/WikiContentBox"
import WikiDictionary from "../../Components/Documents/WikiDictionary"

import WikiGreeting from "../../Components/Documents/WikiGreeting"
import WikiHeader from "../../Components/Documents/WikiHeader"
import WikiSidebar from "../../Components/Documents/WikiSidebar"

const Container = styled.main`
  display: flex;

  height: 100vh;
`

const SideBar = styled.aside`
  padding: 20px;
  background-color: #f6f6f6;
  height: 100vh;
  width: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainArea = styled.section``

const ContentArea = styled.section`
  height: calc(100vh - 80px);

  padding: 20px 24px;
`

const ContentMainArea = styled.section`
  width: 100%;

  background-color: white;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  border: solid 1px skyblue;
  padding: 10px;
  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

const ExplorerLink = styled.em`
  font-size: 20px;
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
`

const ExplorerModal = styled.div`
  position: absolute;
  width: 50%;
  background-color: white;
  right: 0;
  opacity: 0.9;
`

const Backend: React.FC = () => {
  const [content, setContent] = useState<JSX.Element | null>(null) // 모달에 들어갈 내용 설정
  const explorerModal = useRef<HTMLDivElement | null>(null)

  // 키워드 탐색기 실행
  const handleExplorer = (keyword: string) => {
    setContent(WikiDictionary(keyword))
  }

  return (
    <Container>
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
              title="왜 MySQL을 사용했는가?"
              sort="MySQL"
              text={
                <div>
                  저는 처음 접한 DB가 mongoDB였고 이 프로젝트 이전에는 다른 DB를 사용해본 적이
                  없었습니다 그런데 이번에 이 프로젝트에서는 DB형태가 SNS형식 (스키마간의 관계가
                  복잡하게 맺어져 있음) 이므로 RDBMS가 적합할 것 같아 MySQL을 사용해보기로 했습니다
                  -- mongoDB와 같은 경우, 데이터를 연결할 때 테이블에 테이블을 통째로 붙여 하나의
                  테이블로 만들어버리는 구조를 가지고 있습니다 이는 RDBMS에 비해 용량을 많이
                  차지하지만, 쿼리를 수행할 때 RDBMS에 비해 빠른 속도를 낼 수 있습니다. 반면 MySQL과
                  같은 RDBMS는 용량을 적게 차지하지만 쿼리 속도가 느리겠죠. -- 또한 RDBMS는 엄격한
                  스키마 구조를 가지고 있습니다 엄격한 스키마 구조란, 한 번 스키마를 생성하고 나서는
                  마음대로 수정할 수 없는 것을 뜻합니다 이것은 원본 스키마 구조를 지켜줄 수 있는
                  안정성을 가지고 있지만, 유연성이 떨어지죠. 반면 mongoDB는 이 부분에서 자유로워
                  스키마를 생성하고 난 후에도 마음대로 붙였다 땠다 할 수 있습니다 (이것을 join,
                  partition-tolerance 라고 하는데, mongoDB에서는 join이라는 개념이 없습니다. )
                  이말은 즉슨, RDBMS는 유연성이 낮지만 안정성이 좋고, mongoDB는 안정성은 비교적
                  낮지만 유연한 스키마 구조를 가지고 있다는 것을 뜻합니다. -- 이 프로젝트는 사실
                  실시간 데이터 교환이 활발하지만 테이블간의 관계가 많아 무엇을 선택해야 할 지 잘
                  몰랐습니다 제가 내린 결론은, 자주 변경되지 않는 스키마 구조를 가지고 있고,
                  스키마간의 관계가 많을 때 유리한 RDBMS가 더 적합하다고 생각헀습니다. (물론
                  정답이라고 확신할 수는 없습니다) 그리고 프로젝트가 커질 수록 용량을 덜 차지하게
                  되는 RDBMS가 더 적합하다고 판단했습니다.
                </div>
              }
              imageSrc="data:image/png;base64,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"
            />
            <WikiContentBox
              title="Node.js 사용 이유"
              sort="Node.js"
              text={
                <div>
                  본 프로젝트는 실시간 채팅, 영상 스트리밍이 주기능인 어플리케이션이므로 Node.js의
                  장점을 잘 살릴 수 있습니다. Node.js는 event-driven, non-blocking I/O model을
                  사용하여 실시간 서비스에 유리합니다 아래는 노드 js의 특징입니다: Event-Based
                  Server Real-time applications deal with many real-time users. Node.js development
                  supports response depending on the event-driven server that assists in
                  non-blocking functioning. Data Sync A Node.js developer makes the proper use of
                  the non-blocking I/O feature. Data transmission between server and client shifts
                  quickly. Scalable and Fast Since Node is a JavaScript-based program, it pulls the
                  application faster like JS. Therefore, an application with the single-threaded
                  model and the event loop can deal with several client requests easily. Sharing and
                  Reusing Node.js is a real-time programming language that assists the microservice
                  architecture. It allows developers to use the library code package again and share
                  it in many projects. Moreover, it helps developers in fostering enhanced
                  productivity and saving time. SEO Friendliness SEO is necessitous to exist in the
                  digital world. In case you don’t want to lose out on SEO, then you should
                  incorporate the Node in the app development tech stack. Node.js’s backend
                  rendering increases engagement and provides the site more visibility. The
                  applications receive not just user experience and high speed but also a high-end
                  performance that is important for ranking according to SEO features decided by
                  Google. Proxy Server Node is also the best option where intermediary admins are
                  needed. For using Node.js server as a proxy server, a developer requires adding a
                  20-line code and your app will become an ideal fir for assisting for streaming
                  data from different sources. Suitability of Node.js for Real-Time Application
                  Development The relevant framework can be Feather.JS or Express.JS. In Feather.JS,
                  you will find good Socket.IO integration. Socket.IO library and Express.JS
                  framework are required for developing an easy chat app by using Node.js. Socket.IO
                  With real-time web apps, it performs like the top-notch JavaScript library.
                  Between server and web clients, it creates a bi-directional and real-time
                  connection by assisting developers. There is a client-side library in the browser,
                  and for Node.js, there is a server-side library. Both elements feature the same
                  API. Like Node.js, it is event-driven. The Socket.IO offers the capacity of
                  carrying out binary streaming, document collaboration, instant messaging, and
                  real-time analytics. Express.JS It performs like a Node.js framework that utilizes
                  many effective features that help organize the routing of the app. It can simply
                  deal with any templating solution. Node.js’s basic functionality is increased by
                  it. Moreover, it allows a better code organization.
                </div>
              }
              imageSrc="https://buddy.works/guides/covers/test-nodejs-app/share-nodejs-logo.png"
            />
            <WikiContentBox
              title="Cookie-Session Login이 뭘까?"
              sort="Passport.js"
              text={
                <div>
                  클라이언트에서 로그인할 때 유저정보 ( username, password ) 전달 ={">"} 서버에 요청
                  ={">"} 서버가{" "}
                  <ExplorerLink onClick={() => handleExplorer("세션")}>세션</ExplorerLink>에 유저
                  정보를 저장 ={">"} 해당 세션의 ID를 클라이언트의 쿠키에 전달 ={">"} 서버에 요청을
                  할 때마다 쿠키에 담겨있는 세션 ID를 서버에 전달하여 로그인 상태 유지.
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
