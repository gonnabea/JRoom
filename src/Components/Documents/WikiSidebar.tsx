import { Link } from "react-router-dom"
import styled from "styled-components"

const SideBar = styled.aside`
  padding: 20px;
  background-color: #f6f6f6;
  top: 10vh;
  height: 90vh;
  width: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 550px) {
    display: none;
  }
`

const WikiLogo = styled.img`
  max-width: 120px;
  max-height: 120px;
`
const PageTitle = styled.h1`
  font-size: 18px;
  margin-bottom: 0px;
`
const TitleTail = styled.span`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 20px;
`
const SideBarMenu = styled(Link)`
  font-size: 12px;
  padding: 3px;
`
const Footer = styled.footer`
  width: 100%;
  padding: 5px;
  border: solid 1px skyblue;
  flex-direction: column;
  position: static;
  background-color: #eeeeee;
  font-size: 12px;
  margin-top: 100%;
`

interface props {
  menus: Array<string>
}

const WikiSidebar: React.FC<props> = ({ menus }) => {
  return (
    <SideBar>
      <WikiLogo src="/images/wiki_logo.png"></WikiLogo>
      <PageTitle>위키백과</PageTitle>
      <TitleTail>Jiwon의 CS 백과</TitleTail>

      {menus.map((menu) => (
        <SideBarMenu to={`/${menu}`}>{menu}</SideBarMenu>
      ))}
      <Footer>
        위키백과의 디자인을 클론하여 만든 페이지임을 밝힙니다. -Jiwon-
        <br />
        <a href="https://en.wikipedia.org/wiki/Main_Page" target="_blank">
          컨셉 페이지
        </a>
      </Footer>
    </SideBar>
  )
}

export default WikiSidebar
