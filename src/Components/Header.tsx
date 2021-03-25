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
`

const ToHomeLink = styled.a`
  position: relative;

  font-size: 20px;
  text-decoration: none;
  width: 10vw;
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
      <ToHomeLink href="/">홈으로</ToHomeLink>
      <HeaderTitle>{title}</HeaderTitle>
    </Container>
  )
}

export default Header
