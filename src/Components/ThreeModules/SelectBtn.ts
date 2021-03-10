import * as THREE from "three"
import { FlatShading } from "three"
import {
  camera,
  scene,
  selectBtnObjs,
  cssScene,
  embedWebsite,
  controls,
  websiteObject,
} from "../ThreeScene"
import CSS3D from "three-css3drenderer"

// 선택 버튼 생성
export const addSelectBtn = (props: {
  text: string
  btnPosition: { x: number; y: number; z: number }
  cameraPosition: { x: number; y: number; z: number }
  targetPosition?: { x: number; y: number; z: number }
  zoomIndex: number
}) => {
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

  selectBtn.onclick = () => {
    // 액자 모델 프레임
    // const meshsOfFrame =
    //   frameGroupMesh?.children[0].children[0].children[0].children[0].children[0].children[0]
    //     .children

    if (props.text === "0") {
      controls.target.set(0, 0, 0)
    }

    // TV 버튼을 클릭했을 경우
    if (props.text === "1") {
      controls.target.set(websiteObject.position.x, 0, websiteObject.position.z) // 예외적으로 타겟이 정해짐

      camera.updateMatrix()

      // meshsOfFrame.map((object: { visible: boolean }) => {
      //   object.visible = false
      // })
    } // 프로젝트 변경 버튼을 클릭했을 경우
    else if (props.text === "✨") {
      chooseProject()
      controls.target.set(websiteObject.position.x, 0, websiteObject.position.z)
      camera.updateMatrix()
      // meshsOfFrame.map((object: { visible: boolean }) => {
      //   object.visible = false
      // })
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
