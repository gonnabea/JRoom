import CSS3D from "three-css3drenderer"
import * as THREE from "three"
import { cssScene, scene } from "../../Screen/ThreeScreens/ThreeScene"

// Three.js에 html embed 시키기
// TV 모델에 올려진 plane mesh

export let embedWebsite = document.createElement("iframe")
const addIframeObj = (props: {
  width: number
  height: number
  siteUrl: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
}) => {
  const geometry = new THREE.PlaneBufferGeometry(props.width, props.height)

  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 0.0,
    side: THREE.DoubleSide,
  })
  const planeMesh = new THREE.Mesh(geometry, material)
  planeMesh.position.set(props.position.x, props.position.y, props.position.z)
  planeMesh.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)
  scene.add(planeMesh)

  embedWebsite.src = props.siteUrl
  embedWebsite.width = `${props.width}px`
  embedWebsite.height = `${props.height}px`
  embedWebsite.style.opacity = "0"
  embedWebsite.onmouseover = () => {
    embedWebsite.style.opacity = "1"
    tvBackCover.style.opacity = "1"
  }
  embedWebsite.onmouseleave = () => {
    embedWebsite.style.opacity = "0"
    tvBackCover.style.opacity = "0"
  }

  const websiteObject = new CSS3D.CSS3DObject(embedWebsite)
  websiteObject.position.set(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z)
  websiteObject.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)
  cssScene.add(websiteObject)

  // TV 뒷면 가리기 위한 Div Box

  const tvBackCover = document.createElement("div")

  tvBackCover.style.width = `${props.width}px`
  tvBackCover.style.height = `${props.height}px`
  tvBackCover.style.backgroundColor = "black"
  tvBackCover.style.color = "white"
  tvBackCover.style.fontSize = "80px"
  tvBackCover.style.opacity = "0"
  const tvBackCoverObject = new CSS3D.CSS3DObject(tvBackCover)
  tvBackCoverObject.position.set(
    planeMesh.position.x - 3,
    planeMesh.position.y,
    planeMesh.position.z
  )
  tvBackCoverObject.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)
  //   cssScene.add(tvBackCoverObject)
}

export default addIframeObj
