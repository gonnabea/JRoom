import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { scene } from "../ThreeScene"
import { FontLoder } from "./FontLoader"
import { addLogoBox } from "./LogoBox"

import reactLogo from "../../resources/images/reactLogo.jpg"
import styledComponentsLogo from "../../resources/images/styledComponents.jpg"
import netlifyLogo from "../../resources/images/netlify.jpg"
import jsLogo from "../../resources/images/vanillajs.png"
import sunsetImg1 from "../resources/images/Sunset Backgrounds/sunset12.jpg"
import { addCeilConnector } from "./CeilConnetor"
import { addFrame } from "./Frame"
import * as THREE from "three"
import CSS3D from "three-css3drenderer"
import { cssScene } from "../ThreeScene"
import addDescriptionBoard from "./DescriptionBoard"
import { addRoofWindowHole } from "./RoofWIndowHole"
import { addWindow } from "./Window"
import { addSelectBtn } from "./SelectBtn"

export const JFlixObjects = () => {
  // J-Flix 지붕
  const roofShape = new THREE.Shape()
  roofShape.moveTo(0, 0)
  roofShape.lineTo(1000, 0) // rotate로 인해 x는 높이, y는 깊이
  roofShape.lineTo(1000, 1000)
  roofShape.lineTo(0, 2000)

  const extrudeSettings = {
    steps: 2,
    depth: 3000, // Z축: 깊이 (rotate로 인해 너비가 됨)
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelOffset: 0,
    bevelSegments: 1,
  }

  const roofGeometry = new THREE.ExtrudeGeometry(roofShape, extrudeSettings)
  const roofMaterial = new THREE.MeshPhongMaterial({
    color: 0x24292e,
    specular: "orange",
    flatShading: true,
  })
  roofMaterial.side = THREE.DoubleSide
  const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial)

  // roofGeometry.faces.splice(20, 4) // 지붕의 밑면 제거

  // 창문 구멍 뚫기

  addRoofWindowHole(roofMesh)

  // 지붕에 달린 창문 (앞면 3개)

  addWindow(
    { x: -750, y: 975, z: 500 },
    { x: 400, y: 315, z: 300 },
    { x: -Math.PI / 4, y: -Math.PI, z: 0 }
  ) // Arguments: {position, scale, rotation}
  addWindow(
    { x: 0, y: 975, z: 500 },
    { x: 400, y: 315, z: 300 },
    { x: -Math.PI / 4, y: -Math.PI, z: 0 }
  )
  addWindow(
    { x: 750, y: 975, z: 500 },
    { x: 400, y: 315, z: 300 },
    { x: -Math.PI / 4, y: -Math.PI, z: 0 }
  )

  // 지붕에 달린 창문 (뒷면 1개)

  // addWindow(
  //   { x: 0, y: 1050, z: -400 },
  //   { x: 500, y: 350, z: 300 },
  //   { x: Math.PI / 4, y: -Math.PI, z: 0 }
  // )

  // 책 모형에 붙일 텍스트 geometry
  FontLoder(
    {
      fontModelUrl: "/fonts/helvetiker_regular.typeface.json",
      text: "J-Flix",
      size: 80,
      height: 50,
      color: 0x02f6d5,
      bevelSize: 7,
    },
    { x: 100, y: 200, z: -900 }
  )
  // 프로젝트 제목

  // 제작자 이름
  FontLoder(
    {
      fontModelUrl: "/fonts/helvetiker_regular.typeface.json",
      text: "Made By.Jiwon",
      size: 35,
      height: 50,
      color: 0xffffff,
      bevelSize: 3,
    },
    { x: 100, y: 100, z: -900 }
  )

  FontLoder(
    {
      fontModelUrl: "/fonts/D2D.json",
      text:
        "HTML,CSS,순수_JavaScript로_만든\n\n미니_프로젝트들과_\n\n_리액트를_사용하여_만든_\n\nnomflix_클론입니다",
      size: 20,
      height: 10,
      color: 0xffffff,
      bevelSize: 1,
    },
    { x: -200, y: 0, z: -900 }
  )

  // 기술스택 박스 만들기

  addLogoBox({ x: -500, y: 200, z: -940 }, reactLogo)
  addLogoBox({ x: -500, y: -200, z: -940 }, styledComponentsLogo)
  addLogoBox({ x: 700, y: 100, z: -940 }, netlifyLogo)
  addLogoBox({ x: 700, y: -300, z: -940 }, jsLogo)

  const loader = new GLTFLoader()

  // TV GLTF 모델 로드
  loader.load("/models/2018_flat_screen_tv/scene.gltf", (gltf) => {
    gltf.scene.scale.set(750, 750, 2000)
    gltf.scene.position.set(-1200, 0, 0)
    gltf.scene.traverse(function (child) {
      if ((<THREE.Mesh>child).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    gltf.scene.rotateY(Math.PI / 2)
    scene.add(gltf.scene)
  })

  // 소파 모델 로드

  loader.load("/models/sofa-edit/scene.gltf", (gltf) => {
    gltf.scene.scale.set(220, 220, 220)
    gltf.scene.position.set(0, -500, 100)
    gltf.scene.rotateY(Math.PI)
    gltf.scene.traverse(function (child) {
      if ((<THREE.Mesh>child).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    scene.add(gltf.scene)
  })

  // 팝콘 모델 로드

  loader.load("/models/popcorn_bucket/scene.gltf", (gltf) => {
    gltf.scene.scale.set(100, 100, 100)
    gltf.scene.position.set(-1000, -500, 850)

    gltf.scene.rotateY(Math.PI)
    scene.add(gltf.scene)
  })

  // 방문 모델 로드

  loader.load("/models/door/scene.gltf", (gltf) => {
    gltf.scene.scale.set(600, 300, 300)
    gltf.scene.position.set(1200, -500, -1030)
    gltf.scene.rotateY(Math.PI / 2)

    scene.add(gltf.scene)
  })

  // 액자 모델 추가, 노마드 로고 그림 배치
  addFrame()

  // 천장과 벽지 이음새 생성
  addCeilConnector({ x: 2, y: 3, z: 9.9 }, 200, { x: 1480, y: 490, z: -1000 }, "black", {
    x: 0,
    y: 0,
    z: Math.PI / 2,
  })

  addCeilConnector({ x: 2, y: 3, z: 9.9 }, 200, { x: -1460, y: 490, z: -1000 }, "black", {
    x: 0,
    y: 0,
    z: Math.PI,
  })

  addCeilConnector({ x: 2, y: 3, z: 9.9 }, 300, { x: -1460, y: 480, z: -970 }, "black", {
    x: 0,
    y: Math.PI / 2,
    z: Math.PI / 2,
  })
  addCeilConnector({ x: 2, y: 3, z: 9.9 }, 300, { x: -1460, y: 485, z: 970 }, "black", {
    x: 0,
    y: Math.PI / 2,
    z: -Math.PI / 2,
  })

  // 바닥 이음새
  addCeilConnector({ x: 2, y: 3, z: 9.9 }, 200, { x: 1480, y: -490, z: -1000 }, "grey", {
    x: 0,
    y: 0,
    z: Math.PI / 2,
  })

  addCeilConnector({ x: 2, y: 3, z: 9.9 }, 200, { x: -1460, y: -490, z: -1000 }, "grey", {
    x: 0,
    y: 0,
    z: Math.PI,
  })

  addCeilConnector({ x: 2, y: 3, z: 9.9 }, 300, { x: -1460, y: -480, z: -970 }, "grey", {
    x: 0,
    y: Math.PI / 2,
    z: Math.PI / 2,
  })

  addCeilConnector({ x: 2, y: 3, z: 9.9 }, 300, { x: -1460, y: -485, z: 970 }, "grey", {
    x: 0,
    y: Math.PI / 2,
    z: -Math.PI / 2,
  })

  // 선택 버튼 생성

  // J-Flix 방 포커싱
  addSelectBtn({
    text: "0",
    btnPosition: { x: 0, y: 300, z: -800 },
    cameraPosition: { x: -2773.8192101111504, y: 490.0248603839669, z: 4120.7527992239675 },
    targetPosition: { x: 0, y: 0, z: 0 },
    zoomIndex: 0.3,
  })

  // tv 포커싱
  addSelectBtn({
    text: "1",
    btnPosition: { x: -1300, y: 600, z: 500 },
    cameraPosition: { x: 1000, y: 300, z: 0 },
    targetPosition: { x: 600, y: 250, z: 0 },
    zoomIndex: 0.2,
  })

  // 채널 변경 버튼 & tv 포커싱
  addSelectBtn({
    text: "✨",
    btnPosition: { x: -1300, y: 600, z: 300 },
    cameraPosition: { x: 1000, y: 300, z: 0 },
    targetPosition: { x: 900, y: 300, z: 0 },
    zoomIndex: 0.2,
  })

  // 프로젝트 설명 DOM 오브젝트
  addDescriptionBoard({
    width: "600px",
    height: "400px",
    description:
      "영화 소개 사이트 입니다. 리액트 내에서 ajax를 사용해 만들었으며, json 데이터의 동적 처리, SPA, 컴포넌트 활용 등 순수 JavaScript와 비교해서 어떤 점이 리액트가 우수한 지 알 수 있었던 프로젝트였습니다.",
    title: "J-Flix",
    titleColor: "#10EEC6",
    siteUrl: "https://nomfilx-jiwon.netlify.app/#/",
    position: { x: -1200, y: 610, z: -400 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
  })
}
