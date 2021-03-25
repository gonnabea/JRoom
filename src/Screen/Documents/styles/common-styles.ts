import styled from "styled-components"

export const Container = styled.main`
  display: flex;
  position: relative;
  height: 100vh;
`

export const MainArea = styled.section``

export const ContentArea = styled.section`
  height: calc(100vh - 80px);

  padding: 20px 24px;
`

export const ContentMainArea = styled.section`
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

export const ExplorerLink = styled.span`
  /* font-size: 20px; */
  font-weight: 700;
  text-decoration: underline;
  cursor: pointer;
`

export const ExplorerModal = styled.div`
  position: absolute;
  width: 50%;
  background-color: white;
  right: 0;
  opacity: 0.9;
  @media (max-width: 700px) {
    width: 100%;
  }
`
