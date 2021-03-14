import { Link } from "react-router-dom"
import styled from "styled-components"
import WikiContentBox from "../../Components/Documents/WikiContentBox"
import WikiGreeting from "../../Components/Documents/WikiGreeting"
import WikiHeader from "../../Components/Documents/WikiHeader"
import WikiSidebar from "../../Components/Documents/WikiSidebar"

const Container = styled.main`
  display: flex;
  width: calc(100vw - 40px);
  height: 100vh;
`

const SideBar = styled.aside`
  padding: 20px;
  background-color: #f6f6f6;
  height: 100vh;
  width: 10em;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MainArea = styled.section``

const ContentArea = styled.section`
  height: calc(100vh - 80px);
  width: calc(100vw - 10em - 40px);

  padding: 20px 24px;
`

const ContentMainArea = styled.section`
  width: 100%;

  background-color: white;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  border: solid 1px skyblue;
  padding: 10px;
`

const WikiMain: React.FC = () => {
  return (
    <Container>
      <WikiSidebar menus={[]} />
      <MainArea>
        <WikiHeader />
        <ContentArea>
          <WikiGreeting
            title="Jiwon의 CS 백과에 오신 것을 환영합니다,"
            msg={`제가 만든 프로젝트들을 기점으로 얻을 수 있는 Computer Science 지식들을 정리해 놓은
              페이지입니다.
            내용은 지속적으로 추가될 것입니다.`}
          />
          <ContentMainArea>
            <WikiContentBox
              title="현실과 가상의 경계가 사라지는 ‘메타버스’가 온다
              "
              sort=""
              text="페이스북은 지난해 10월 가상현실(VR) 기기 오큘러스 퀘스트2를 출시하면서 VR시장 판도를 바꿨다는 평가를 받고 있다. 지난해 판매량이 100만대를 넘었고, 올해도 1000만대 이상 팔릴 것으로 예상된다. 마크 저커버그 페이스북 최고경영자(CEO)는 8일(현지 시각) “오큘러스는 이미 퀘스트 3와 4를 구상하고 있다”며 “올해 말 스마트 글래스를 출시할 계획”이라고 밝혔다.

              코로나 팬데믹으로 비대면·온라인 추세가 가속화되면서 최근 가상세계와 현실세계가 혼합된 메타버스 서비스가 인기를 끌고 있다. 메타버스는 직역하면 ‘초(meta·超)세계(verse)’란 뜻이다. 현실 사회를 디지털로 복제하고 발전시켜 돌아가도록 만든 가상의 온라인 세상을 가리킨다. 2018년 개봉해 화제가 됐던 스티븐 스필버그 영화 ‘레디 플레이어 원’에서는 사람들이 원하는 캐릭터로 가상현실에 접속해 무엇이든 할 수 있는 ‘오아시스’라는 게임이 등장한다. 이러한 영화 같은 이야기가 더 이상 미래의 일이 아니라는 것이다. 저커버그 CEO는 새로운 형태의 아바타를 올해 출시한다고 밝혔다. 아바타는 온라인 가상 공간에서 자신의 정체성을 담은 시각적 이미지다. 아바타로 입장해 다른 사람이 만들어놓은 게임을 즐기거나 본인이 직접 게임이나 콘텐츠를 만들어 판매할 수 있는 미국의 ‘로블록스’라는 메타버스 서비스는 이용자가 1억5000만명에 이른다. 미국 만 9~12세 어린이의 3분의 2가 이 게임을 이용할 정도로 인기다.
              
              국내에서는 네이버제트가 운영 중인 ‘제페토’가 메타버스 인기를 잘 보여주고 있다. 제페토는 이용자와 꼭 닮은 3차원(3D) 아바타를 만든 뒤 증강현실(AR) 기술로 실제 사진이나 가상 배경에 자연스럽게 합성해주는 서비스로 최근 가입자 수 2억명을 돌파했다. 블랙핑크와 트와이스 등 K팝 그룹이 제페토에서 아바타를 만들어 전 세계 팬과 소통하고, 전통적인 마케팅을 중시하는 명품 브랜드들까지 제페토를 적극 활용하고 있다. 전문가들은 “대용량 데이터를 실시간으로 전송할 수 있는 초고속·초연결·초저지연의 5G 통신망이 상용화되면서 메타버스 시대를 앞당기고 있다”고 분석했다. 시장조사기관 스태티스타는 2021년 AR, VR, MR(혼합현실) 등의 시장 규모는 307억달러(35조원)에 달하고, 2024년에는 전체 시장 규모를 3000억달러(341조5000억원)로 예측했다.
              
              
              거대한 신시장을 놓치지 않기 위해 빅테크 기업들은 새로운 제품과 서비스를 내놓고 과감한 투자에 나서고 있다. 마이크로소프트는 지난해 11월 혼합 현실용 홀로그래픽 컴퓨터인 홀로렌즈 2를 국내 시장에 선보였다. 최근에는 물리적으로 다른 지역에 있는 사용자들이 한방에 있는 것처럼 느낄 수 있게 만들어주는 디지털 협업 플랫폼 ‘MS 메시’도 공개했다.
              
              삼성전자, 애플도 도전장을 던지고 있다. 최근 IT 팁스터(유출자) 워킹캣이 트위터를 통해 삼성전자의 AR 글래스 영상으로 추정되는 자료를 공개했다. 삼성전자 AR 글래스를 쓰면 눈앞에 대형 디스플레이가 펼쳐진 것 같은 효과를 누릴 수 있다. 홀로그램을 이용해 문서작업, 화상통화를 할 수 있다. 애플도 이르면 11월 AR 글래스를 내놓을 것이라는 전망이 나오고 있다. 애플의 AR 글래스는 소니의 마이크로 유기발광다이오드(OLED) 디스플레이를 적용했고, 아이폰과 연동해서 쓸 수 있는 구조로 가격은 3000달러 정도로 예상된다. 이에 앞서 애플은 지난해 미국 가상현실 콘텐츠 제조사 ‘넥스트VR’을 인수했다."
              imageSrc="https://images.chosun.com/resizer/LibMAZKVzgOmvlzP0y7LfYBOdmw=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/QFEL3JN25NJL5ET52E4D323W7U.jpg"
            />
          </ContentMainArea>
        </ContentArea>
      </MainArea>
    </Container>
  )
}

export default WikiMain
