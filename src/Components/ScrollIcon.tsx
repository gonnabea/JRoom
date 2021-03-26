import styled from "styled-components"

const Container = styled.span`
  background-color: transparent;
  position: fixed;
  bottom: 10vh;
  right: 10vw;
  color: white;
  z-index: 1;
  font-weight: 700;
  font-size: 50px;
  text-align: center;
  opacity: 0.7;
  animation: move 1s infinite;
  @keyframes move {
    to {
      bottom: 9vh;
    }
  }
`

const ScrollIcon = () => {
  return (
    <Container>
      ᐱ<br />
      scroll
      <br />ᐯ
    </Container>
  )
}

export default ScrollIcon
