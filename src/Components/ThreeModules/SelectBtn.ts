import * as THREE from "three"
import { FlatShading } from "three"
import {
  camera,
  scene,
  selectBtnObjs,
  cssScene,
  controls,
} from "../../Screen/ThreeScreens/ThreeScene"
import CSS3D from "three-css3drenderer"
import addDescriptionBoard, { descriptionBox } from "./DescriptionBoard"
import addIframeObj, { embedWebsite, websiteObject } from "./iframeObj"

function chooseProject() {
  // 순차적으로 프로젝트 변경
  // 나중에 버튼을 여러개 만들어 각각 선택할 수 있게 할까 고민중.
  // switch - case로 변경 예정
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
  } else {
    embedWebsite.src = "https://nomfilx-jiwon.netlify.app/#/"
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
      width: "600px",
      height: "400px",
      description:
        "영화 소개 사이트 입니다. 리액트 내에서 ajax를 사용해 만들었으며, json 데이터의 동적 처리, SPA, 컴포넌트 활용 등 순수 JavaScript와 비교해서 어떤 점이 리액트가 우수한 지 알 수 있었던 프로젝트였습니다.",
      title: "J-Flix",
      titleColor: "#10EEC6",
      siteUrl: "https://nomfilx-jiwon.netlify.app/#/",
      position: { x: 100, y: 800, z: -900 },
      rotation: { x: 0, y: 0, z: 0 },
    })
  }

  selectBtn.onclick = () => {
    if (props.text === "0") {
      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }

      controls.target.set(0, 0, 0)
    } else if (props.text === "1") {
      controls.target.set(-500, 0, 0) // 예외적으로 타겟이 정해짐
      embedWebsite.style.display = "none"

      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }

      // JFlix 웹사이트 로드
      addIframeObj({
        width: 1400,
        height: 800,
        siteUrl: "https://nomfilx-jiwon.netlify.app/#/",
        position: { x: -1200, y: 10, z: 0 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
      })

      // JFlix 프로젝트 설명 보드 로드
      addJFlixBoard()
      embedWebsite.style.display = "block"
      camera.updateMatrix()
    } else if (props.text === "📄") {
      // JFlix 프로젝트 설명 보드 로드
      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }
      addJFlixBoard()
    } // 프로젝트 변경 버튼
    else if (props.text === "✨") {
      descriptionBox.style.display = "none"
      embedWebsite.style.display = "none"

      embedWebsite.style.display = "block"
      chooseProject()
      controls.target.set(websiteObject.position.x, 0, websiteObject.position.z)
      camera.updateMatrix()
      // JFLIX 프로젝트 설명 보드
      addJFlixBoard()
    } else if (props.text === "4") {
      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }
      embedWebsite.style.display = "none"

      // Just-Read-It 프로젝트 설명 보드
      addDescriptionBoard({
        siteUrl: "https://just-read-it.herokuapp.com/",
        width: "500px",
        height: "400px",
        title: "Just Read It",
        titleColor: "orange",
        description:
          "node.js-express 서버와 자바스크립트 연습용 프로젝트입니다. css 애니메이션과 3D 효과에 가장 공을 들였습니다. \n 1. ",
        position: { x: -4300, y: -200, z: -3300 },
        rotation: { x: 0, y: Math.PI / 2, z: 0 },
      })
    } else if (props.text === "5") {
      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }
      embedWebsite.style.display = "none"

      // ON 프로젝트 설명 보드
      addDescriptionBoard({
        siteUrl: "https://our-now.herokuapp.com/",
        width: "600px",
        height: "400px",
        title: "ON",
        titleColor: "purple",
        description:
          "카카오톡과 같이 실시간 채팅과 1:1, 다대다 채팅이 가능하며, 화상통화 기능과 얼굴인식을 통환 효과 각종 영상처리 넣기를 지원하는 웹입니다.",
        position: { x: 4000, y: 1000, z: -1950 },
        rotation: { x: 0, y: -Math.PI / 2, z: 0 },
      })

      // ON 프로젝트 웹사이트 로드
      addIframeObj({
        siteUrl: "https://our-now.herokuapp.com/#/",
        position: { x: 4000, y: 400, z: -2380 },
        width: 1200,
        height: 800,
        rotation: { x: 0, y: -Math.PI / 2, z: 0 },
      })
      embedWebsite.style.display = "block"
    } else {
      embedWebsite.style.display = "none"
      if (descriptionBox) {
        descriptionBox.style.display = "none"
      }
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
