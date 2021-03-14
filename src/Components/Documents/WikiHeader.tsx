import { Link } from "react-router-dom"
import styled from "styled-components"

const Header = styled.header`
  display: flex;
  height: 80px;
`
const HeaderTab = styled(Link)`
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
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`

const WikiHeader: React.FC = () => {
  return (
    <Header>
      <HeaderTab to="/documents">News</HeaderTab>
      <HeaderTab to="/documents/front-end">프론트엔드</HeaderTab>
      <HeaderTab to="/documents/back-end">백엔드</HeaderTab>
      <HeaderTab to="/documents/network">네트워크 통신</HeaderTab>
      <HeaderTab to="/documents/computer-vision">영상처리</HeaderTab>
      <HeaderTab to="/documents/3d-game">3D 게임</HeaderTab>
      <HeaderTab to="/documents/android">안드로이드</HeaderTab>
      <HeaderTab to="/documents/common">공통</HeaderTab>
    </Header>
  )
}

export default WikiHeader
