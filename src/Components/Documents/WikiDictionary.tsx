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

  // 키워드에 따른 설명 구분
  if (keyword === "세션") {
    return (
      <Container id="modal">
        <Title>{keyword}</Title>
        <ExitBtn onClick={handleExit}>X</ExitBtn>
        <Description>
          세션(session)은 컴퓨터 과학에서, 특히 네트워크 분야에서 반영구적이고 상호작용적인 정보
          교환을 전제하는 둘 이상의 통신 장치나 컴퓨터와 사용자 간의 대화나 송수신 연결상태를
          의미하는 보안적인 다이얼로그(dialogue) 및 시간대를 가리킨다. 따라서 세션은 연결상태를
          유지하는것보다 연결상태의 안정성을 더 중요시 하게된다. 일반적으로, 세션은 컴퓨터 시스템의
          관리자(또는 OS 또는 서버)가 자신의 자산을 이용하는것을 허락한 사용자 (컴퓨팅)를 인식한
          일정한 기간을 가리키는것으로 광범위하게 이해될 수 있다. 따라서, 세션 동안에 사용자는
          시스템으로 부터 허락된 범위안에서 응용프로그램,설정값,자원을 사용할 수 있게 되지만, 이러한
          인스턴스는 여전히 세션관리자인 컴퓨터시스템의 감독하에 관리되어야 한다.[2] 이러한 세션은
          일반적으로 로그인의 방식을 통해 컴퓨터와 사용자간에 성사되고 유지된다. 이로써 세션은 특정
          사용자를 다른 사용자로 부터 보호하거나 예기치 않은 로그아웃으로 부터 특정사용자의 이전의
          기록 복원이 가능하게 된다.
        </Description>
      </Container>
    )
  }
  if (keyword === "쿠키") {
    return (
      <Container id="modal">
        <Title>{keyword}</Title>
        <ExitBtn onClick={handleExit}>X</ExitBtn>
        <Description>
          쿠키(영어: cookie)란 하이퍼 텍스트의 기록서(HTTP)의 일종으로서 인터넷 사용자가 어떠한
          웹사이트를 방문할 경우 그 사이트가 사용하고 있는 서버를 통해 인터넷 사용자의 컴퓨터에
          설치되는 작은 기록 정보 파일을 일컫는다.[1] HTTP 쿠키, 웹 쿠키, 브라우저 쿠키라고도 한다.
          이 기록 파일에 담긴 정보는 인터넷 사용자가 같은 웹사이트를 방문할 때마다 읽히고 수시로
          새로운 정보로 바뀐다. 이 수단은 넷스케이프의 프로그램 개발자였던 루 몬툴리(Lou Montulli)가
          고안한 뒤로 오늘날 많은 서버 및 웹사이트들이 브라우저의 신속성을 위해 즐겨 쓰고 있다.
        </Description>
      </Container>
    )
  }
  if (keyword === "스레드") {
    return (
      <Container id="modal">
        <Title>{keyword}</Title>
        <ExitBtn onClick={handleExit}>X</ExitBtn>
        <Description>
          프로세스 내에서 할당받은 실행의 단위. 스레드는 프로세스 당 CPU의 코어 개수만큼 생성될 수
          있습니다.
        </Description>
      </Container>
    )
  }
  if (keyword === "프로세스") {
    return (
      <Container id="modal">
        <Title>{keyword}</Title>
        <ExitBtn onClick={handleExit}>X</ExitBtn>
        <Description>
          메모리에 올라와 실행되고 있는 프로그램의 인스턴스. 실행되고 있는 프로그램(독립적인 개체).
        </Description>
      </Container>
    )
  }
  if (keyword === "클러스터링") {
    return (
      <Container id="modal">
        <Title>{keyword}</Title>
        <ExitBtn onClick={handleExit}>X</ExitBtn>
        <Description>
          컴퓨터 클러스터(영어: computer cluster)는 여러 대의 컴퓨터들이 연결되어 하나의 시스템처럼
          동작하는 컴퓨터들의 집합을 말한다. 클러스터의 구성 요소들은 일반적으로 고속의 근거리
          통신망으로 연결된다. 서버로 사용되는 노드에는 각각의 운영 체제가 실행된다. 컴퓨터
          클러스터는 저렴한 마이크로프로세서와 고속의 네트워크, 그리고 고성능 분산 컴퓨팅용
          소프트웨어들의 조합 결과로 태어났다. 클러스터는 일반적으로 단일 컴퓨터보다 더 뛰어난
          성능과 안정성을 제공하며, 비슷한 성능과 안정성을 제공하는 단일 컴퓨터보다 비용 면에서 훨씬
          더 효율적이다.[1] 따라서 열 개 안팎의 중소 규모의 클러스터부터 수천 개로 이루어진 대형
          슈퍼컴퓨터에 이르기까지 널리 사용되고 있다.
        </Description>
      </Container>
    )
  }
  if (keyword === "포크") {
    return (
      <Container id="modal">
        <Title>{keyword}</Title>
        <ExitBtn onClick={handleExit}>X</ExitBtn>
        <Description>
          컴퓨팅, 특히 유닉스 운영 체제와 유닉스 계열 환경에서 포크(fork)란 프로세스가 자기 자신을
          복제하는 동작이다. 이는 일반적으로 시스템 호출의 일종이며, 커널 안에서 구현된다. 포크는
          유닉스 계열 운영 체제에서 프로세스를 만드는 주된 방식이다. 복제의 대상을 부모 프로세스라
          하고 그 결과물을 자식 프로세스라 한다.
        </Description>
      </Container>
    )
  }
  if (keyword === "SPA") {
    return (
      <Container id="modal">
        <Title>{keyword}</Title>
        <ExitBtn onClick={handleExit}>X</ExitBtn>
        <Description>
          싱글 페이지 애플리케이션(single-page application, SPA, 스파)은 서버로부터 완전한 새로운
          페이지를 불러오지 않고 현재의 페이지를 동적으로 다시 작성함으로써 사용자와 소통하는 웹
          애플리케이션이나 웹사이트를 말한다. 이러한 접근은 연속되는 페이지들 간의 사용자 경험의
          간섭을 막아주고 애플리케이션이 더 데스크톱 애플리케이션처럼 동작하도록 만들어준다. SPA에서
          HTML, 자바스크립트, CSS 등 필요한 모든 코드는 하나의 페이지로 불러오거나,[1] 적절한
          자원들을 동적으로 불러들여서 필요하면 문서에 추가하는데, 보통 사용자의 동작에 응답하게
          되는 방식이다. 문서는 프로세스 중 어떠한 지점에서도 다시 불러들이지 않으며 다른 문서로
          제어권을 넘기지 않으나, 위치 해시나 HTML5 히스토리 API를 사용하여 애플리케이션 안에서
          개개의 논리 문서의 인식 및 탐색을 제공할 수 있다.[2] 싱글 페이지 애플리케이션과의 소통은
          뒷편에 있는 웹 서버와의 동적인 통신을 수반하기도 한다.
        </Description>
      </Container>
    )
  }
  if (keyword === "TCP") {
    return (
      <Container id="modal">
        <Title>{keyword}</Title>
        <ExitBtn onClick={handleExit}>X</ExitBtn>
        <Description>
          전송 제어 프로토콜(Transmission Control Protocol, TCP, 문화어: 전송조종규약)은 인터넷
          프로토콜 스위트(IP)의 핵심 프로토콜 중 하나로, IP와 함께 TCP/IP라는 명칭으로도 널리
          불린다. TCP는 근거리 통신망이나 인트라넷, 인터넷에 연결된 컴퓨터에서 실행되는 프로그램
          간에 일련의 옥텟을 안정적으로, 순서대로, 에러없이 교환할 수 있게 한다. TCP는 전송 계층에
          위치한다. 네트워크의 정보 전달을 통제하는 프로토콜이자 인터넷을 이루는 핵심 프로토콜의
          하나로서 국제 인터넷 표준화 기구(IETF)의 RFC 793에 기술되어 있다. TCP는 웹 브라우저들이
          월드 와이드 웹에서 서버에 연결할 때 사용되며, 이메일 전송이나 파일 전송에도 사용된다.
          TCP의 안정성을 필요로 하지 않는 애플리케이션의 경우 일반적으로 TCP 대신 비접속형 사용자
          데이터그램 프로토콜(User Datagram Protocol)을 사용한다. 이것은 전달 확인 및 순차 보장
          기능이 없는 대신 오버헤드가 작고 지연시간이 짧다는 장점이 있다.
        </Description>
      </Container>
    )
  }
  if (keyword === "UDP") {
    return (
      <Container id="modal">
        <Title>{keyword}</Title>
        <ExitBtn onClick={handleExit}>X</ExitBtn>
        <Description>
          사용자 데이터그램 프로토콜(User Datagram Protocol, UDP)은 인터넷 프로토콜 스위트의 주요
          프로토콜 가운데 하나이다. 1980년에 데이빗 리드가 설계하였고, 현재 IETF의 RFC 768로
          표준으로 정의되어 있으며, TCP와 함께 데이터그램으로 알려진 단문 메시지를 교환하기 위해서
          사용된다. UDP는 유니버설 데이터그램 프로토콜(Universal Datagram Protocol)이라고 일컫기도
          한다. UDP의 전송 방식은 너무 단순해서 서비스의 신뢰성이 낮고, 데이터그램 도착 순서가
          바뀌거나, 중복되거나, 심지어는 통보 없이 누락시키기도 한다. UDP는 일반적으로 오류의 검사와
          수정이 필요 없는 애플리케이션에서 수행할 것으로 가정한다. UDP를 사용하는 네트워크
          애플리케이션에는 도메인 이름 서비스 (DNS), IPTV, 음성 인터넷 프로토콜 (VoIP), TFTP, IP
          터널, 그리고 많은 온라인 게임 등이 있다.
        </Description>
      </Container>
    )
  }
}

export default WikiDictionary
