import * as THREE from "three"
import { DoubleSide } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { scene } from "./ThreeScene"
import { FontLoder } from "../../Components/ThreeModules/FontLoader"
import JsLogo from "../../resources/images/vanillajs.png"
import tsLogo from "../../resources/images/tsLogo.png"
import threejsLogo from "../../resources/images/threejsLogo.png"
import reactLogo from "../../resources/images/reactLogo.jpg"

import { addLogoBox } from "../../Components/ThreeModules/LogoBox"
import { addFloor } from "../../Components/ThreeModules/floor"
import floorImage2 from "../../resources/images/floor2.jpg"
import { addSelectBtn } from "../../Components/ThreeModules/SelectBtn"
import { GLTFModelLoader } from "../../Components/ThreeModules/GLTFModelLoader"

const loader = new GLTFLoader()

const MainHallObjects = () => {
  // 알림판 모델 로드
  loader.load("/models/futuristic_sandwich_board/scene.gltf", (gltf) => {
    gltf.scene.scale.set(400, 400, 400)
    gltf.scene.position.set(800, -500, -1300)

    gltf.scene.rotateY(Math.PI)
    scene.add(gltf.scene)

    // 알림판 앞면 커버
    const JFlixRoomBoardGeo = new THREE.PlaneGeometry(350, 400)
    const JFlixRoomBoardTexture = new THREE.TextureLoader().load(JsLogo)
    const JFlixRoomBoardMat = new THREE.MeshPhongMaterial({
      specular: "orange",
      flatShading: true,
      color: "gray",
      map: JFlixRoomBoardTexture,
    })
    const JFlixRoomBoardMesh = new THREE.Mesh(JFlixRoomBoardGeo, JFlixRoomBoardMat)
    JFlixRoomBoardMesh.position.set(800, -230, -1290)
    JFlixRoomBoardMesh.rotation.set(Math.PI / 12, Math.PI, 0)
    JFlixRoomBoardMesh.material.side = DoubleSide

    // J-FLIX 안내판
    FontLoder(
      {
        fontModelUrl: "/fonts/helvetiker_regular.typeface.json",
        text: "Vanilla-JS\n\nReact.js",
        size: 40,
        height: 1,
        color: 0xffffff,
        bevelSize: 1,
      },
      { x: 900, y: -200, z: -1280 },
      { x: Math.PI / 12, y: Math.PI, z: 0 }
    )

    scene.add(JFlixRoomBoardMesh)
  })

  // 화분 모델 로드
  GLTFModelLoader({
    modelUrl: "models/flowervase/scene.gltf",
    scale: {
      x: 20,
      y: 20,
      z: 20,
    },
    position: {
      x: 800,
      y: -300,
      z: -1500,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
  })

  // 창문 모델 로드
  loader.load("/models/window1/scene.gltf", (gltf) => {
    gltf.scene.scale.set(320, 370, 100)
    gltf.scene.position.set(0, 70, -4050)

    scene.add(gltf.scene)
  })

  // 기술 스택 로고 박스
  addLogoBox({ x: -600, y: 200, z: -4000 }, threejsLogo)
  addLogoBox({ x: -600, y: -100, z: -4000 }, reactLogo)
  addLogoBox({ x: 600, y: 200, z: -4000 }, tsLogo)

  addFloor({ width: 3000, height: 2900, x: 0, y: -490, z: -2500, imageSrc: floorImage2 }) // 메인 홀 바닥

  // 거실 (로비) 포커싱
  addSelectBtn({
    text: "2",
    btnPosition: { x: 1200, y: 300, z: -1000 },
    cameraPosition: { x: 0, y: 0, z: -3000.7527992239675 },
    targetPosition: { x: 0, y: 0, z: -2000 },
    zoomIndex: 0.2,
  })

  // 자동차 로드 포커싱
  addSelectBtn({
    text: "3",
    btnPosition: { x: 0, y: 0, z: -3500 },
    cameraPosition: { x: 0, y: 0, z: -4000.7527992239675 },
    targetPosition: { x: 0, y: 0, z: -3000 },
    zoomIndex: 0.2,
  })
}

export default MainHallObjects
