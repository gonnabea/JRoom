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
import { frameGroupMesh } from "./Frame"

// 선택 버튼 생성
export const addSelectBtn = (contents: {
  text: string
  btnPosition: { x: number; y: number; z: number }
  cameraPosition: { x: number; y: number; z: number }
  zoomIndex: number
}) => {
  function chooseProject() {
    // 순차적으로 프로젝트 변경
    // 나중에 버튼을 여러개 만들어 각각 선택할 수 있게 할까 고민중.
    if (embedWebsite.src === "https://nomfilx-jiwon.netlify.app/#/") {
      embedWebsite.src = "https://gonnabea.github.io/Music-Player/"
    } else if (embedWebsite.src === "https://gonnabea.github.io/Music-Player/") {
      embedWebsite.src = "https://gonnabea.github.io/Typing-Game/"
    } else if (embedWebsite.src === "https://gonnabea.github.io/Typing-Game/") {
      embedWebsite.src = "https://gonnabea.github.io/Hangman-Game/"
    } else {
      embedWebsite.src = "https://nomfilx-jiwon.netlify.app/#/"
    }
  }

  const selectBtn = document.createElement("button")
  selectBtn.innerHTML = contents.text
  selectBtn.style.width = "100px"
  selectBtn.style.height = "100px"
  selectBtn.style.fontSize = "60px"
  selectBtn.style.borderRadius = "100%"
  selectBtn.style.background = "rgba(0,0,0,0.5)"
  selectBtn.style.color = "white"

  selectBtn.onmouseover = () => {
    selectBtn.style.color = "skyblue"
    selectBtn.style.border = "10px solid skyblue"
    selectBtn.style.cursor = "pointer"
  }
  selectBtn.onmouseleave = () => {
    selectBtn.style.border = "none"

    selectBtn.style.color = "white"
  }

  const selectBtnObj = new CSS3D.CSS3DObject(selectBtn)

  selectBtnObjs.push(selectBtnObj)

  selectBtnObj.position.set(contents.btnPosition.x, contents.btnPosition.y, contents.btnPosition.z)
  selectBtnObj.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
  cssScene.add(selectBtnObj)

  selectBtn.onclick = () => {
    // (TV 버튼을 클릭했을 경우)
    const meshsOfFrame =
      frameGroupMesh?.children[0].children[0].children[0].children[0].children[0].children[0]
        .children
    if (contents.text === "1") {
      console.log(frameGroupMesh)

      meshsOfFrame.map((object: { visible: boolean }) => {
        object.visible = false
      })
    } // 프로젝트 변경 버튼을 클릭했을 경우
    else if (contents.text === "✨") {
      chooseProject()

      meshsOfFrame.map((object: { visible: boolean }) => {
        object.visible = false
      })
    } else {
      meshsOfFrame.map((object: { visible: boolean }) => {
        object.visible = true
      })
    }

    camera.rotation.set(
      websiteObject.rotation.x,
      websiteObject.rotation.y,
      websiteObject.rotation.z
    )
    camera.position.set(
      contents.cameraPosition.x,
      contents.cameraPosition.y,
      contents.cameraPosition.z
    )

    camera.zoom = contents.zoomIndex

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
