import styled from "styled-components"

const Container = styled.main``

const WikiLogo = styled.img`
  width: 120px;
  height: 120px;
`

const Header = styled.header`
  display: flex;
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
`

const TitleTail = styled.span``

const Documents: React.FC = () => {
  return (
    <Container>
      <SideBar>
        <WikiLogo src="images/wiki_logo.png"></WikiLogo>
        <PageTitle>위키백과</PageTitle>
        <TitleTail>Jiwon의 CS 백과</TitleTail>
      </SideBar>
    </Container>
  )
}

export default Documents
