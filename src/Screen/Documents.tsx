import styled from "styled-components"

const Container = styled.main`
  display: flex;
  width: calc(100vw - 40px);
  height: 100vh;
`

const WikiLogo = styled.img`
  width: 120px;
  height: 120px;
`

const Header = styled.header`
  display: flex;
  height: 80px;
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

const PageTitle = styled.h1`
  font-size: 18px;
  margin-bottom: 0px;
`

const TitleTail = styled.span`
  font-size: 12px;
  font-weight: 600;
`

const HeaderTab = styled.nav`
  cursor: pointer;
  background-image: linear-gradient(to bottom, rgba(167, 215, 249, 0) 0, #a7d7f9 100%);
  background-repeat: no-repeat;
  height: 40px;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #0645ad;
  border: solid 1px skyblue;
  border-top: 0px;
  :hover {
    text-decoration: underline;
  }
`

const MainArea = styled.section``

const ContentArea = styled.section`
  height: calc(100vh - 80px);
  width: calc(100vw - 10em - 40px);
  border: solid 1px skyblue;
  padding: 20px 24px;
`

const GreetingBox = styled.div`
  background-color: #f1e8e8;
  border: solid 1px gray;
  width: 100%;
  height: 15%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`
const GreetingTitle = styled.span`
  font-size: 1.5vw;
  margin-bottom: 5px;
`

const GreetingMsg = styled.span`
  max-width: 40%;
  font-size: 0.8vw;
`

const Documents: React.FC = () => {
  return (
    <Container>
      <SideBar>
        <WikiLogo src="images/wiki_logo.png"></WikiLogo>
        <PageTitle>위키백과</PageTitle>
        <TitleTail>Jiwon의 CS 백과</TitleTail>
      </SideBar>
      <MainArea>
        <Header>
          <HeaderTab>메인 페이지</HeaderTab>
        </Header>
        <ContentArea>
          <GreetingBox>
            <GreetingTitle>Jiwon의 CS 백과에 오신 것을 환영합니다,</GreetingTitle>
            <GreetingMsg>
              제가 만든 프로젝트를 기점으로 얻을 수 있는 Computer Science 지식들을 정리해 놓은
              페이지입니다. 내용은 끊임 없이 추가될 것입니다.
            </GreetingMsg>
          </GreetingBox>
        </ContentArea>
      </MainArea>
    </Container>
  )
}

export default Documents
