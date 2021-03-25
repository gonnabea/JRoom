import styled from "styled-components"

const Container = styled.div`
  width: 100vw;
  height: 100vw;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  z-index: 2;
`

const Loader = () => {
  return <Container>로딩중입니다...</Container>
}

export default Loader
