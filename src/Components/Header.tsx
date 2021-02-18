import React from "react"
import styled from "styled-components"

const Container = styled.header`
  width: 100%;
  height: 5%;
  display: flex;
  font-size: 30px;
  color: rgba(0, 0, 0, 0.3);
  background-color: white;
  position: fixed;
  top: 0;
  z-index: 999;
`

const ToHomeLink = styled.a`
  position: relative;

  left: 0;
`

const HeaderTitle = styled.span`
  position: relative;
  left: 33.333333%;
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
