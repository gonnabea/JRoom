import * as THREE from "three"
import { DoubleSide } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { loadingManager, scene } from "./ThreeScene"
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
import { FBXLoader } from "fbxloader.ts"
import { addFrame } from "../../Components/ThreeModules/Frame"

const MainHallObjects = () => {
  const loader = new GLTFLoader(loadingManager)
  // 알림판 모델 로드
  // loader.load("/models/futuristic_sandwich_board/scene.gltf", (gltf) => {
  //   gltf.scene.scale.set(400, 400, 400)
  //   gltf.scene.position.set(500, -500, -1300)

  //   gltf.scene.rotateY(Math.PI)
  //   scene.add(gltf.scene)

  //   // 알림판 앞면 커버
  //   const JFlixRoomBoardGeo = new THREE.PlaneGeometry(350, 400)
  //   const JFlixRoomBoardTexture = new THREE.TextureLoader().load(JsLogo)
  //   const JFlixRoomBoardMat = new THREE.MeshPhongMaterial({
  //     specular: "white",
  //     flatShading: true,
  //     color: "gray",
  //     map: JFlixRoomBoardTexture,
  //   })
  //   const JFlixRoomBoardMesh = new THREE.Mesh(JFlixRoomBoardGeo, JFlixRoomBoardMat)
  //   JFlixRoomBoardMesh.position.set(500, -230, -1290)
  //   JFlixRoomBoardMesh.rotation.set(Math.PI / 12, Math.PI, 0)
  //   JFlixRoomBoardMesh.material.side = DoubleSide

  //   // J-FLIX 안내판
  //   FontLoder(
  //     {
  //       fontModelUrl: "/fonts/helvetiker_regular.typeface.json",
  //       text: "Vanilla-JS\n\nReact.js",
  //       size: 40,
  //       height: 1,
  //       color: 0xff9500,
  //       bevelSize: 1,
  //     },
  //     { x: 600, y: -200, z: -1280 },
  //     { x: Math.PI / 12, y: Math.PI, z: 0 }
  //   )

  //   scene.add(JFlixRoomBoardMesh)
  // })

  // 화분 모델 로드
  // GLTFModelLoader({
  //   modelUrl: "models/flowervase/scene.gltf",
  //   scale: {
  //     x: 20,
  //     y: 20,
  //     z: 20,
  //   },
  //   position: {
  //     x: 800,
  //     y: -300,
  //     z: -1500,
  //   },
  //   rotation: {
  //     x: 0,
  //     y: 0,
  //     z: 0,
  //   },
  // })

  // 식탁 모델 로드

  loader.load("/models/simple_dining_table/animated.glb", (gltf) => {
    gltf.scene.scale.set(4, 4, 4)
    gltf.scene.position.set(0, -500, -2000)

    console.log(gltf)

    const mixer = new THREE.AnimationMixer(gltf.scene)

    const clips = gltf.animations
    function update() {
      mixer.update(0.02)
    }
    console.log(clips)
    const clip = THREE.AnimationClip.findByName(clips, "Mesh_1Action")

    const action = mixer.clipAction(clip)
    action.play()
    console.log(clip)

    setInterval(update, 1000 / 60)

    scene.add(gltf.scene)
  })

  // 부억 세트 모델 로드
  loader.load("/models/sims_kitchen/scene.gltf", (gltf) => {
    gltf.scene.scale.set(300, 300, 250)
    gltf.scene.position.set(-300, -490, -3900)
    gltf.scene.rotation.set(0, 0, 0)
    console.log(gltf.scene)
    scene.add(gltf.scene)
  })

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

  addFrame({
    imageUrl: "/images/vanillajs.png",
    position: { x: 1490, y: 0, z: -2000 },
    rotateY: Math.PI,
  })

  // TypeScript 로고 액자
  loader.load("/models/customs/typescript_frame.glb", (gltf) => {
    gltf.scene.scale.set(100, 100, 100)
    gltf.scene.position.set(0, 0, -1100)
    gltf.scene.rotation.set(0, Math.PI / 2, 0)
    console.log(gltf.scene)
    const mixer = new THREE.AnimationMixer(gltf.scene)

    const clips = gltf.animations
    function update() {
      mixer.update(0.02)
    }
    const clip = THREE.AnimationClip.findByName(clips, "tsLogoAction.001")

    const action = mixer.clipAction(clip)
    action.play()

    setInterval(update, 1000 / 20)
    scene.add(gltf.scene)
  })

  // threejs 로고 액자
  loader.load("/models/customs/threejs_frame.glb", (gltf) => {
    gltf.scene.scale.set(100, 100, 100)
    gltf.scene.position.set(-300, 0, -1100)
    gltf.scene.rotation.set(0, Math.PI / 2, 0)
    const mixer = new THREE.AnimationMixer(gltf.scene)

    const clips = gltf.animations
    function update() {
      mixer.update(0.02)
    }
    console.log(clips)
    const clip = THREE.AnimationClip.findByName(clips, "threejsLogoAction.001")

    const action = mixer.clipAction(clip)
    action.play()
    console.log(clip)

    setInterval(update, 1000 / 20)
    scene.add(gltf.scene)
    scene.add(gltf.scene)
  })

  // react 로고 액자
  loader.load("/models/customs/react_frame.glb", (gltf) => {
    gltf.scene.scale.set(100, 100, 100)
    gltf.scene.position.set(360, 0, -1300)
    gltf.scene.rotation.set(0, Math.PI / 2, 0)

    scene.add(gltf.scene)
  })
}

export default MainHallObjects
