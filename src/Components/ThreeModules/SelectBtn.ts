import { camera, selectBtnObjs, cssScene, controls } from "../../Screen/ThreeScreens/ThreeScene"
import CSS3D from "three-css3drenderer"
import addDescriptionBoard, { descriptionBox } from "./DescriptionBoard"
import addIframeObj, { embedWebsite, websiteObject } from "./iframeObj"
import { addOpenDoorAni, addCloseDoorAni } from "../../Screen/ThreeScreens/JFlixObjs"

function chooseProject() {
  // 순차적으로 프로젝트 변경
  // 나중에 버튼을 여러개 만들어 각각 선택할 수 있게 할까 고민중.
  // switch - case로 변경 예정
  if (embedWebsite) {
    if (embedWebsite.src === "https://nomfilx-jiwon.netlify.app/#/") {
      embedWebsite.src = "https://gonnabea.github.io/Music-Player/"
    } else if (embedWebsite.src === "https://gonnabea.github.io/Music-Player/") {
      embedWebsite.src = "https://gonnabea.github.io/Typing-Game/"
    } else if (embedWebsite.src === "https://gonnabea.github.io/Typing-Game/") {
      embedWebsite.src = "https://gonnabea.github.io/Hangman-Game/"
    } else if (embedWebsite.src === "https://gonnabea.github.io/Hangman-Game/") {
      embedWebsite.src = "https://gonnabea.github.io/Expense-Tracker/"
    } else if (embedWebsite.src === "https://gonnabea.github.io/Expense-Tracker/") {
      embedWebsite.src = "https://gonnabea.github.io/Speech-Text-Reader/"
    } else if (embedWebsite.src === "https://gonnabea.github.io/Speech-Text-Reader/") {
      embedWebsite.src = "https://gonnabea.github.io/Sortable-List/"
    } else if (embedWebsite.src === "https://gonnabea.github.io/Sortable-List/") {
      embedWebsite.src = "https://gonnabea.github.io/Breakout-Game/"
    } else if (embedWebsite.src === "https://gonnabea.github.io/Breakout-Game/") {
      embedWebsite.src = "https://www.youtube.com/embed/5Gty04W5lPg"
    } else {
      embedWebsite.src = "https://nomfilx-jiwon.netlify.app/#/"
    }
  }
}

// 선택 버튼 생성
export const addSelectBtn = (props: {
  text: string
  btnPosition: { x: number; y: number; z: number }
  cameraPosition: { x: number; y: number; z: number }
  targetPosition?: { x: number; y: number; z: number }
  zoomIndex: number
}) => {
  const selectBtn = document.createElement("button")
  selectBtn.innerHTML = props.text
  selectBtn.style.width = "100px"
  selectBtn.style.height = "100px"
  selectBtn.style.fontSize = "60px"
  selectBtn.style.borderRadius = "100%"
  selectBtn.style.background = "rgba(0,0,0,0.5)"
  selectBtn.style.color = "white"

  selectBtn.onmouseover = () => {
    selectBtn.style.color = "skyblue"
    selectBtn.style.border = "7px solid skyblue"
    selectBtn.style.cursor = "pointer"
  }
  selectBtn.onmouseleave = () => {
    selectBtn.style.border = "none"

    selectBtn.style.color = "white"
  }

  const selectBtnObj = new CSS3D.CSS3DObject(selectBtn)

  selectBtnObjs.push(selectBtnObj)

  selectBtnObj.position.set(props.btnPosition.x, props.btnPosition.y, props.btnPosition.z)
  selectBtnObj.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
  cssScene.add(selectBtnObj)

  const addJFlixBoard = () => {
    addDescriptionBoard({
      width: "800px",
      height: "550px",
      description:
        "실시간으로 업데이트 되는 <br/> 영화 소개 & 검색 사이트 입니다.<br/> 리액트 내에서 ajax를 사용해 만들었으며,<br/> json 데이터의 동적 처리, SPA, 컴포넌트 활용 등<br/> 순수 JavaScript에 비해<br/> 어떤 점이 리액트가 우수한 지<br/> 알 수 있었던 프로젝트였습니다.",
      title: "J-Flix",
      titleColor: "#10EEC6",
      siteUrl: "https://nomfilx-jiwon.netlify.app/#/",
      position: { x: 100, y: 900, z: -900 },
      rotation: { x: 0, y: 0, z: 0 },
    })
  }

  const addONBoard = () => {
    addDescriptionBoard({
      siteUrl: "https://our-now.herokuapp.com/#/",
      width: "1000px",
      height: "550px",
      title: "ON",
      titleColor: "#09FFFF",
      description:
        "카카오톡과 같이 실시간 채팅과 1:1, 다대다 채팅이 가능하며, p2p 화상통화 기능과 얼굴인식을 통환 효과 넣기 등을 지원하는 웹입니다. <br/><br/>1. 로그인 / 로그아웃 <br/> 2. P2P, N:N 채팅방 만들기 <br/> 3. 실시간 채팅 <br/> 4. P2P 화상채팅 <br/> 5. 얼굴인식을 이용한 그래픽 효과 주기",
      position: { x: 4000, y: 1090, z: -2400 },
      rotation: { x: 0, y: -Math.PI / 2, z: 0 },
    })
  }

  const addJustReadItBoard = () => {
    addDescriptionBoard({
      siteUrl: "https://just-read-it.herokuapp.com/",
      width: "850px",
      height: "580px",
      title: "Just Read It",
      titleColor: "orange",
      description:
        "Node.js-Express 서버와 순수 자바스크립트로 만든 <br/> 게시판 컨셉의 연습용 프로젝트입니다.<br/> css 애니메이션과 3D 효과에 가장 공을 들였습니다. <br/><br/> 1. 소셜로그인 기능 <br/> 2. 카카오톡 책 검색 api <br/> 3. 책 장르별 분류 <br/> 4. 등록된 책 검색 <br/>  5. CRUD <br/> ",
      position: { x: -4500, y: 1280, z: -2500 },
      rotation: { x: 0, y: Math.PI / 2, z: 0 },
    })
  }

  selectBtn.onclick = () => {
    if (props.text === "0") {
      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }
      if (embedWebsite) {
        embedWebsite.style.display = "none"
      }

      controls.target.set(0, 0, 0)
      addCloseDoorAni()
    } else if (props.text === "1") {
      controls.target.set(-500, 0, 0) // 예외적으로 타겟이 정해짐
      if (embedWebsite) {
        embedWebsite.style.display = "none"
      }

      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }

      // JFlix 웹사이트 로드
      // 모바일에서 크기 변경
      if (window.matchMedia("(min-width:500px)").matches) {
        addIframeObj({
          width: 1400,
          height: 800,
          siteUrl: "https://nomfilx-jiwon.netlify.app/#/",
          position: { x: -1200, y: 10, z: 0 },
          rotation: { x: 0, y: Math.PI / 2, z: 0 },
        })
      } else {
        addIframeObj({
          width: 1000,
          height: 800,
          siteUrl: "https://nomfilx-jiwon.netlify.app/#/",
          position: { x: -1200, y: 10, z: 0 },
          rotation: { x: 0, y: Math.PI / 2, z: 0 },
        })
      }

      // JFlix 프로젝트 설명 보드 로드
      addJFlixBoard()
      if (embedWebsite) {
        embedWebsite.style.display = "block"
      }
      camera.updateMatrix()
      addCloseDoorAni()
    } else if (props.text === "📄") {
      // JFlix 프로젝트 설명 보드 로드
      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }
      addJFlixBoard()
    } // 프로젝트 변경 버튼
    else if (props.text === "✨") {
      controls.target.set(-500, 0, 0) // 예외적으로 타겟이 정해짐
      if (embedWebsite) {
        embedWebsite.style.display = "none"
      }

      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }

      // JFlix 프로젝트 설명 보드 로드
      addJFlixBoard()
      if (embedWebsite) {
        embedWebsite.style.display = "block"
      }
      camera.updateMatrix()
      chooseProject()
      addCloseDoorAni()
    } else if (props.text === "4") {
      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }
      if (embedWebsite) {
        embedWebsite.style.display = "none"
      }

      addJustReadItBoard()
    } else if (props.text === "5") {
      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }
      if (embedWebsite) {
        embedWebsite.style.display = "none"
      }

      addONBoard()

      // ON 프로젝트 웹사이트 로드
      addIframeObj({
        siteUrl: "https://our-now.herokuapp.com/#/",
        position: { x: 4000, y: 400, z: -2380 },
        width: 1200,
        height: 800,
        rotation: { x: 0, y: -Math.PI / 2, z: 0 },
      })
      if (embedWebsite) {
        embedWebsite.style.display = "block"
      }
    } else {
      if (embedWebsite) {
        embedWebsite.style.display = "none"
      }
      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }
      addOpenDoorAni()
    }

    if (props.targetPosition) {
      controls.target.set(props.targetPosition.x, props.targetPosition.y, props.targetPosition.z)
    }
    camera.position.set(props.cameraPosition.x, props.cameraPosition.y, props.cameraPosition.z)
    camera.zoom = props.zoomIndex

    camera.updateProjectionMatrix()
    camera.updateMatrix()
    cssScene.updateMatrixWorld()

    // 카메라 자동 이동 시 iframe이 비활성화되는 현상 해결책
    controls.rotateUp(-0.01)
    controls.update()

    selectBtnObjs.map((selectBtnObj) => {
      selectBtnObj.scale.set(1, 1, 1)
      selectBtnObj.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
      camera.updateProjectionMatrix()
      camera.updateMatrix()
      cssScene.updateMatrixWorld()
    })
  }
}
