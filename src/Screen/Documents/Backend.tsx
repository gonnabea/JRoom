import { Link } from "react-router-dom"
import styled from "styled-components"
import WikiContentBox from "../../Components/Documents/WikiContentBox"
import WikiGreeting from "../../Components/Documents/WikiGreeting"
import WikiHeader from "../../Components/Documents/WikiHeader"
import WikiSidebar from "../../Components/Documents/WikiSidebar"

const Container = styled.main`
  display: flex;
  width: calc(100vw - 40px);
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
  width: calc(100vw - 10em - 40px);

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
`

const Backend: React.FC = () => {
  return (
    <Container>
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
          <ContentMainArea></ContentMainArea>
        </ContentArea>
      </MainArea>
    </Container>
  )
}

export default Backend
