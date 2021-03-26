import styled from "styled-components"
import Header from "../Components/Header"

const Container = styled.section``

const Body = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`

const ContentsBox = styled.div`
  border: solid 1px black;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AboutMe: React.FC = () => {
  return (
    <Container>
      <Header title="Jiwon" />
      <Body>PREPARING ... 😎</Body>
    </Container>
  )
}

export default AboutMe
