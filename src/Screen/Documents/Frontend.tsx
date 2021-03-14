import { Link } from "react-router-dom"
import styled from "styled-components"
import WikiContentBox from "../../Components/Documents/WikiContentBox"
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

const Frontend: React.FC = () => {
  return (
    <Container>
      <WikiSidebar
        menus={[
          "HTML",
          "CSS",
          "JavaScript",
          "TypeScript",
          "React",
          "Webpack",
          "Babel",
          "Tailwind CSS",
          "GraphQL",
          "React-Testing-Library",
        ]}
      />
      <MainArea>
        <WikiHeader />
        <ContentArea>
          <WikiGreeting
            title="Jiwon의 프론트엔드 관련 CS 지식입니다."
            msg={`제가 만든 프로젝트들을 기점으로 얻을 수 있는 Computer Science 지식들을 정리해 놓은
              페이지입니다.
            내용은 지속적으로 추가될 것입니다.`}
          />
          <ContentMainArea>
            <WikiContentBox
              title="React의 사용 이유"
              sort="React"
              text="        실시간 채팅은 당연히 화면 렌더링을 자주할 수 밖에 없습니다. 채팅을 하나 보낼
                  때마다 화면에 변화된 것을 나타내주어야 하기 때문이죠. 리액트는 컴포넌트의 활용,
                  api json data 처리, SPA 와 같은 유용한 특성을 가지고 있으나, 이 프로젝트에서 가장
                  유리한 점은 리액트는 리렌더링을 자주 해주기 용이한 구조를 가지고 있다는 것이라고
                  생각합니다."
              imageSrc="data:image/png;base64,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"
            />
          </ContentMainArea>
        </ContentArea>
      </MainArea>
    </Container>
  )
}

export default Frontend
