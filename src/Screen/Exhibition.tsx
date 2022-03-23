import React from "react"
import styled from "styled-components"
import Header from "../Components/Header"
import ThreeScene from "./ThreeScreens/ThreeScene"

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  opacity: 1;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
`

const Exhibition: React.FC = () => {
  return (
    <Container>
      <Header title="프로젝트 전시" />
      <ThreeScene />
    </Container>
  )
}

export default Exhibition
