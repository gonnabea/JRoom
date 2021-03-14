import styled from "styled-components"

const Header = styled.header`
  display: flex;
  height: 80px;
`
const HeaderTab = styled.nav`
  cursor: pointer;
  background-image: linear-gradient(to bottom, rgba(167, 215, 249, 0) 0, #a7d7f9 100%);
  background-repeat: no-repeat;
  height: 40px;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #0645ad;
  border: solid 1px skyblue;
  border-top: 0px;
  :hover {
    text-decoration: underline;
  }
`

const WikiHeader: React.FC = () => {
  return (
    <Header>
      <HeaderTab>News</HeaderTab>
      <HeaderTab>프론트엔드</HeaderTab>
      <HeaderTab>백엔드</HeaderTab>
      <HeaderTab>네트워크 통신</HeaderTab>
      <HeaderTab>영상처리</HeaderTab>
      <HeaderTab>3D 게임</HeaderTab>
      <HeaderTab>안드로이드</HeaderTab>
      <HeaderTab>공통</HeaderTab>
    </Header>
  )
}

export default WikiHeader
