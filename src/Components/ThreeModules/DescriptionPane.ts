import { scene } from "../ThreeScene"
import * as THREE from "three"
import CSS3D from "three-css3drenderer"
import { cssScene } from "../ThreeScene"

// 프로젝트 설명 DOM 오브젝트
const addDescriptionBoard = (props: {
  width: string
  height: string
  title: string
  titleColor: string
  description: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
}) => {
  const geometry = new THREE.PlaneBufferGeometry(300, 400)

  const material = new THREE.MeshBasicMaterial({
    color: 0x272a2f,
    side: THREE.DoubleSide,
  })
  const planeMesh = new THREE.Mesh(geometry, material)
  planeMesh.position.set(props.position.x, props.position.y, props.position.z)
  planeMesh.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)
  scene.add(planeMesh)

  const descriptionBox = document.createElement("div")
  descriptionBox.style.width = props.width
  descriptionBox.style.height = props.height
  descriptionBox.style.opacity = "0.7"
  descriptionBox.style.cursor = "pointer"

  const title = document.createElement("h2")
  title.style.fontSize = "50px"
  title.innerHTML = props.title
  title.style.color = props.titleColor
  descriptionBox.appendChild(title)

  const description = document.createElement("p")
  description.style.fontSize = "25px"
  description.style.color = "white"
  description.innerHTML = props.description
  descriptionBox.appendChild(description)

  const descriptionObject = new CSS3D.CSS3DObject(descriptionBox)
  descriptionObject.position.set(props.position.x, props.position.y, props.position.z)
  descriptionObject.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)
  cssScene.add(descriptionObject)
}

export default addDescriptionBoard
