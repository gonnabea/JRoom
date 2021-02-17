import * as THREE from "three"
import { DoubleSide, VideoTexture } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { scene } from "../ThreeScene"
import { FontLoder } from "./FontLoader"
import JsLogo from "../../resources/images/vanillajs.png"

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

  loader.load("/models/drawer_of_blacksmith_table_-_a (1)/scene.gltf", (gltf) => {
    gltf.scene.scale.set(390, 500, 1100)
    gltf.scene.position.set(100, 0, -3000)
    scene.add(gltf.scene)
  })

  loader.load("/models/motocross_track/scene.gltf", (gltf) => {
    gltf.scene.scale.set(30, 30, 30)
    gltf.scene.position.set(200, -210, -3000)
    scene.add(gltf.scene)
  })

  // 창문 모델 로드
  loader.load("/models/window1/scene.gltf", (gltf) => {
    gltf.scene.scale.set(320, 370, 100)
    gltf.scene.position.set(0, 70, -4050)
    console.log(gltf.scene)

    scene.add(gltf.scene)
  })
}

export default MainHallObjects
