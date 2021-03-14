import styled from "styled-components"

const GreetingBox = styled.div`
  background-color: #f1e8e8;
  border: solid 1px gray;
  width: 100%;
  height: 15%;
  padding: 10px;
  display: flex;
  flex-direction: column;
`
const GreetingTitle = styled.span`
  font-size: 24px;
  margin-bottom: 5px;
`

const GreetingMsg = styled.span`
  font-size: 12px;
`

interface props {
  title: string
  msg: string
}

const WikiGreeting: React.FC<props> = ({ title, msg }) => {
  return (
    <GreetingBox>
      <GreetingTitle>{title}</GreetingTitle>
      <GreetingMsg>{msg}</GreetingMsg>
    </GreetingBox>
  )
}

export default WikiGreeting
