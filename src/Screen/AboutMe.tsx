import styled from "styled-components"
import Header from "../Components/Header"

const Container = styled.section``

const Body = styled.main`
  position: absolute;
  width: 100vw;
  top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  font-family: Gulim;
  @media screen and (max-width: 1220px) {
    font-size: 25px;
  }
  @media screen and (max-width: 1030px) {
  }
`

const Sentence = styled.p`
  width: 100vw;
  padding: 25px;
  margin: 0;
  :hover {
    font-size: 150%;
  }
  border-bottom: solid 1px black;
`

const AboutMe: React.FC = () => {
  return (
    <Container>
      <Header title="Jiwon" />
      <Body>
        <Sentence>쓸 데 없어도 신기하고 재밌는 것 만들기를 좋아합니다. </Sentence>
        <Sentence>만들고 싶은 것은 어떻게든 만들어내는 악바리 기질이 있습니다 </Sentence>
        <Sentence>합리적 사고를 중시합니다 </Sentence>
        <Sentence>주체적으로 사고하고 행동합니다 </Sentence>
        <Sentence>필요하면 쓴소리도 잘합니다 </Sentence>
        <Sentence>인맥은 나 자신이 가치가 있을 때 의미있는 것이라 생각합니다 </Sentence>
        <Sentence>자기계발을 좋아하고 항상 합니다 </Sentence>
        <Sentence>이기적 이타주의자 입니다 </Sentence>
        <Sentence>공감능력을 중시합니다 </Sentence>
        <Sentence>다수의 말이 항상 맞다고 생각하지 않습니다</Sentence>
        <Sentence>은근히 말이 많습니다 </Sentence>
        <Sentence>꼰대를 싫어합니다 </Sentence>
        <Sentence>꼰대가 되지 않기 위해 돌아보고 노력합니다 </Sentence>
        <Sentence>개발자로서의 가치는 본인의 실력이 가장 중요하고 최우선이라고 생각합니다</Sentence>
        <Sentence>
          협업은 중요하지만 구성원 각각의 실력이 뛰어나야 비로소 빛을 발한다고 생각합니다
        </Sentence>
        <Sentence>
          열심히 하는 것만으로는 부족하고, 더 낫고 올바른 방향을 스스로 찾을 수 있는 안목이
          필요하다고 생각합니다
        </Sentence>
        <Sentence>억대 연봉 급의 실력있는 개발자 분들의 조언을 듣는 것을 좋아합니다</Sentence>
        <Sentence>프로그래밍은 논리적, 예술적, 인문학적인 것이라 생각합니다 </Sentence>
        <Sentence>본인의 실력이 한참, 한참 부족하다는 것을 체감적으로 압니다 </Sentence>
        <Sentence>자기소개 페이지가 중요하다고 생각하지 않습니다 </Sentence>
        <Sentence>반갑습니다 😄</Sentence>
      </Body>
    </Container>
  )
}

export default AboutMe
