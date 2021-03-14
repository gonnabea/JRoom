import styled from "styled-components"

const Container = styled.main`
  padding: 20px;
  display: block;
`

const Title = styled.h2`
  border-bottom: solid 1px black;
  height: 40px;
`
const Description = styled.p`
  line-height: 30px;
`

const ExitBtn = styled.span`
  position: absolute;
  right: 40px;
  top: 20px;
  cursor: pointer;
  font-size: 30px;
`

const handleExit = () => {
  const modal = document.getElementById("modal")
  if (modal) {
    modal.style.display = "none"
  }
}

const showModal = () => {
  const modal = document.getElementById("modal")
  if (modal) {
    modal.style.display = "block"
  }
}

const WikiDictionary: Function = (keyword: string) => {
  showModal()
  if (keyword === "세션") {
    return (
      <Container id="modal">
        <Title>keyword</Title>
        <ExitBtn onClick={handleExit}>X</ExitBtn>
        <Description>
          세션(session)은 컴퓨터 과학에서, 특히 네트워크 분야에서 반영구적이고 상호작용적인 정보
          교환을 전제하는 둘 이상의 통신 장치나 컴퓨터와 사용자 간의 대화나 송수신 연결상태를
          의미하는 보안적인 다이얼로그(dialogue) 및 시간대를 가리킨다. 따라서 세션은 연결상태를
          유지하는것보다 연결상태의 안정성을 더 중요시 하게된다.
        </Description>
      </Container>
    )
  }
}

export default WikiDictionary
