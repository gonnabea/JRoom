// import * as THREE from "three"
// import { FlatShading } from "three"
// import { scene, selectBtnObj } from "../ThreeScene"
// import CSS3D from "three-css3drenderer"

// const addSelectBtn = (contents: {
//   text: string
//   btnPosition: { x: number; y: number; z: number }
//   cameraPosition: { x: number; y: number; z: number }
// }) => {
//   const selectBtn = document.createElement("button")
//   selectBtn.innerHTML = contents.text
//   selectBtn.style.width = "100px"
//   selectBtn.style.height = "100px"
//   selectBtn.style.fontSize = "60px"
//   selectBtn.style.borderRadius = "100%"
//   selectBtn.style.background = "rgba(0,0,0,0.5)"
//   selectBtn.style.color = "white"

//   selectBtn.onmouseover = () => {
//     selectBtn.style.color = "skyblue"
//     selectBtn.style.border = "10px solid skyblue"
//     selectBtn.style.cursor = "pointer"
//   }
//   selectBtn.onmouseleave = () => {
//     selectBtn.style.border = "none"

//     selectBtn.style.color = "white"
//   }

//   selectBtnObj = new CSS3D.CSS3DObject(selectBtn)
//   selectBtnObj.position.set(contents.btnPosition.x, contents.btnPosition.y, contents.btnPosition.z)
//   selectBtnObj.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
//   cssScene.add(selectBtnObj)

//   selectBtn.onclick = () => {
//     camera.rotation.set(
//       websiteObject.rotation.x,
//       websiteObject.rotation.y,
//       websiteObject.rotation.z
//     )
//     camera.position.set(
//       contents.cameraPosition.x,
//       contents.cameraPosition.y,
//       contents.cameraPosition.z
//     )

//     camera.zoom = 0.8

//     selectBtnObj.scale.set(1, 1, 1)
//     selectBtnObj.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
//     camera.updateProjectionMatrix()
//     camera.updateMatrix()
//     cssScene.updateMatrixWorld()

//     // 카메라 자동 이동 시 iframe이 비활성화되는 현상 해결책
//     controls.rotateUp(-0.01)
//     controls.update()
//   }
// }
// eslint-disable-next-line import/no-anonymous-default-export
export default "x"
