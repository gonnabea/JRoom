import styled from "styled-components"

const ContentBox = styled.div`
  border: solid 1px green;
  min-width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
`
const ContentTitle = styled.h2`
  background-color: #cef2e0;
  border: solid 1px black;
  width: 100%;

  align-self: center;
  padding: 5px;
  margin: 0;
  margin-bottom: 10px;
  font-size: 18px;
`
const ContentImg = styled.img`
  min-width: 140px;
  max-height: 140px;
  margin: 10px 10px 10px 0;
`
const Content = styled.div`
  display: flex;
`
const Text = styled.p`
  margin: 0;
  max-width: 100%;
`

interface props {
  title: string
  imageSrc: string
  text: string
  sort: string // 분류별로 나누기 위한 property
}

const WikiContentBox: React.FC<props> = ({ title, imageSrc, text }) => {
  return (
    <ContentBox>
      <ContentTitle>{title}</ContentTitle>
      <Content>
        <ContentImg src={imageSrc}></ContentImg>
        <Text>{text}</Text>
      </Content>
    </ContentBox>
  )
}

export default WikiContentBox
