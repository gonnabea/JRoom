import styled from "styled-components"

const ContentBox = styled.div`
  border: solid 1px green;
  width: 100%;
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
  width: 200px;
  align-self: center;
  height: 200px;
  margin: 10px 10px 10px 0;
`
const Content = styled.div`
  display: flex;
`
const Text = styled.p`
  margin: 0;
  max-width: 100%;
  line-height: 30px;
`

interface props {
  title: string
  imageSrc: string
  text: JSX.Element
  sort: string // 분류별로 나누기 위한 property
}

const WikiContentBox: React.FC<props> = ({ title, imageSrc, text }) => {
  return (
    <ContentBox>
      <ContentTitle>{title}</ContentTitle>
      <ContentImg src={imageSrc}></ContentImg>
      <Content>
        <Text>{text}</Text>
      </Content>
    </ContentBox>
  )
}

export default WikiContentBox
