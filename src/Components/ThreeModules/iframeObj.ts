import CSS3D from "three-css3drenderer"
import * as THREE from "three"
import { cssScene, scene } from "../../Screen/ThreeScreens/ThreeScene"

// Three.js에 html embed 시키기
// TV 모델에 올려진 plane mesh

export let embedWebsite: HTMLIFrameElement | null = document.createElement("iframe")
export let websiteObject: THREE.Object3D
const addIframeObj = (props: {
  width: number
  height: number
  siteUrl: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
}) => {
  // 제거하기 전 음소거
  ;(embedWebsite as HTMLIFrameElement).remove()
  // 이동 시 iframe 화면 전환 위함
  embedWebsite = null
  embedWebsite = document.createElement("iframe")

  const geometry = new THREE.PlaneBufferGeometry(props.width, props.height)

  const material = new THREE.MeshBasicMaterial({
    color: 0x212121,
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

  websiteObject = new CSS3D.CSS3DObject(embedWebsite)
  websiteObject.position.set(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z)
  websiteObject.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)

  cssScene.add(websiteObject)
}

export default addIframeObj
