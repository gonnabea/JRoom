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
import Header from "../../Components/Header"

const Android: React.FC = () => {
  const [content, setContent] = useState<JSX.Element | null>(null) // 모달에 들어갈 내용 설정
  const explorerModal = useRef<HTMLDivElement | null>(null)

  // 키워드 탐색기 실행
  const handleExplorer = (keyword: string) => {
    setContent(WikiDictionary(keyword))
  }
  return (
    <Container>
      <Header title="Wiki" />
      <ExplorerModal ref={explorerModal}>{content}</ExplorerModal>
      <WikiSidebar menus={["Kotlin"]} />
      <MainArea>
        <WikiHeader />
        <ContentArea>
          <WikiGreeting
            title="Jiwon의 안드로이드 관련 CS 지식입니다."
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

export default Android
