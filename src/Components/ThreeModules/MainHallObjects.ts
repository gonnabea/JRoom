import * as THREE from "three"
import { DoubleSide } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { scene } from "../ThreeScene"
import { FontLoder } from "./FontLoader"

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
    const JFlixRoomBoardMat = new THREE.MeshPhongMaterial({
      specular: 0x0077cc,
      flatShading: true,
      color: "gray",
    })
    const JFlixRoomBoardMesh = new THREE.Mesh(JFlixRoomBoardGeo, JFlixRoomBoardMat)
    JFlixRoomBoardMesh.position.set(800, -230, -1290)
    JFlixRoomBoardMesh.material.side = DoubleSide
    JFlixRoomBoardMesh.rotateX(Math.PI / 12)

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
}

export default MainHallObjects
