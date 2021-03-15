import { Link } from "react-router-dom"
import styled from "styled-components"
import WikiContentBox from "../../Components/Documents/WikiContentBox"
import WikiGreeting from "../../Components/Documents/WikiGreeting"
import WikiHeader from "../../Components/Documents/WikiHeader"
import WikiSidebar from "../../Components/Documents/WikiSidebar"
import {
  Container,
  ContentArea,
  ContentMainArea,
  ExplorerLink,
  ExplorerModal,
  MainArea,
} from "./styles/common-styles"
import WikiDictionary from "../../Components/Documents/WikiDictionary"
import { useRef, useState } from "react"

const CommonWiki: React.FC = () => {
  const [content, setContent] = useState<JSX.Element | null>(null) // 모달에 들어갈 내용 설정
  const explorerModal = useRef<HTMLDivElement | null>(null)

  // 키워드 탐색기 실행
  const handleExplorer = (keyword: string) => {
    setContent(WikiDictionary(keyword))
  }
  return (
    <Container>
      <ExplorerModal ref={explorerModal}>{content}</ExplorerModal>
      <WikiSidebar
        menus={["컴퓨터 구조", "네트워크", "데이터베이스", "운영체제", "하드웨어", "디자인 패턴"]}
      />
      <MainArea>
        <WikiHeader />
        <ContentArea>
          <WikiGreeting
            title="Jiwon의 공통 CS 지식입니다."
            msg={`제가 만든 프로젝트들을 기점으로 얻을 수 있는 Computer Science 지식들을 정리해 놓은
              페이지입니다.
            내용은 지속적으로 추가될 것입니다.`}
          />
          <ContentMainArea></ContentMainArea>
        </ContentArea>
      </MainArea>
    </Container>
  )
}

export default CommonWiki
