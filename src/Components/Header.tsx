import React from "react"
import styled from "styled-components"

const Container = styled.header`
  width: 100%;
  height: 5vh;
  display: flex;
  color: rgba(0, 0, 0, 0.3);
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  box-shadow: 0 0 10px black;
`

const ToHomeLink = styled.a`
  position: relative;
  color: black;
  font-size: 20px;
  text-decoration: none;
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px black;
`

const HeaderTitle = styled.span`
  position: relative;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`

const Header = ({ title }: { title: string }) => {
  return (
    <Container>
      <ToHomeLink href="/">Home</ToHomeLink>
      <HeaderTitle>{title}</HeaderTitle>
    </Container>
  )
}

export default Header
