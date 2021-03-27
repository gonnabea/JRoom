import { scene } from "../../Screen/ThreeScreens/ThreeScene"
import * as THREE from "three"
import CSS3D from "three-css3drenderer"
import { cssScene } from "../../Screen/ThreeScreens/ThreeScene"

export let descriptionBox: HTMLDivElement

// 프로젝트 설명 DOM 오브젝트
const addDescriptionBoard = (props: {
  width: string
  height: string
  title: string
  titleColor: string
  description: string
  siteUrl?: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
}) => {
  const geometry = new THREE.PlaneBufferGeometry(parseInt(props.width), parseInt(props.height))

  const material = new THREE.MeshBasicMaterial({
    color: 0x272a2f,
    side: THREE.DoubleSide,
  })

  const planeMesh = new THREE.Mesh(geometry, material)
  planeMesh.position.set(props.position.x, props.position.y, props.position.z)
  planeMesh.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)

  scene.add(planeMesh)

  descriptionBox = document.createElement("div")
  descriptionBox.style.width = props.width
  descriptionBox.style.height = props.height
  descriptionBox.style.position = "absolute"
  descriptionBox.style.opacity = "0.7"
  descriptionBox.style.cursor = "default"
  descriptionBox.style.paddingLeft = "20px"
  descriptionBox.style.paddingRight = "20px"
  descriptionBox.style.textDecoration = "none"
  descriptionBox.style.overflow = "auto"
  descriptionBox.style.display = "flex"
  descriptionBox.style.flexDirection = "column"

  descriptionBox.style.justifyContent = "center"
  descriptionBox.style.alignItems = "center"

  descriptionBox.onmouseover = () => {
    descriptionBox.style.opacity = "1"
  }
  descriptionBox.onmouseout = () => {
    descriptionBox.style.opacity = "0.7"
  }

  const title = document.createElement("h2")
  title.style.fontSize = "50px"
  title.innerHTML = props.title
  title.style.color = props.titleColor
  title.style.margin = "10px"
  descriptionBox.appendChild(title)

  const description = document.createElement("p")
  description.style.fontSize = "35px"
  description.style.color = "white"
  description.style.textAlign = "center"
  description.style.fontWeight = "700"
  description.style.display = "flex"
  description.style.justifyContent = "center"
  description.style.alignItems = "center"

  description.innerHTML = props.description
  descriptionBox.appendChild(description)

  // 프로젝트 실제 링크
  const siteLink = document.createElement("a")
  siteLink.href = props.siteUrl ? props.siteUrl : ""
  siteLink.style.textAlign = "center"
  siteLink.style.fontWeight = "700"
  siteLink.target = "_blank"
  siteLink.style.fontSize = "40px"
  siteLink.style.color = props.titleColor

  siteLink.innerHTML = props.siteUrl ? "프로젝트 링크" : ""
  descriptionBox.appendChild(siteLink)

  const descriptionObject = new CSS3D.CSS3DObject(descriptionBox)
  descriptionObject.position.set(props.position.x, props.position.y, props.position.z)
  descriptionObject.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)
  cssScene.add(descriptionObject)
}

export default addDescriptionBoard
