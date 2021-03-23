import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { loadingManager, scene } from "./ThreeScene"
import { FontLoder } from "../../Components/ThreeModules/FontLoader"
import { addLogoBox } from "../../Components/ThreeModules/LogoBox"

import reactLogo from "../../resources/images/reactLogo.jpg"
import styledComponentsLogo from "../../resources/images/styledComponents.jpg"
import netlifyLogo from "../../resources/images/netlify.jpg"
import jsLogo from "../../resources/images/vanillajs.png"
import { addCeilConnector } from "../../Components/ThreeModules/CeilConnetor"
import { addFrame } from "../../Components/ThreeModules/Frame"
import * as THREE from "three"

import { addRoofWindowHole } from "../../Components/ThreeModules/RoofWIndowHole"
import { addWindow } from "../../Components/ThreeModules/Window"
import { addSelectBtn } from "../../Components/ThreeModules/SelectBtn"
import { addFloor } from "../../Components/ThreeModules/floor"
import nomadLogo from "../../resources/images/nomadLogo.png"
import floorImage3 from "../../resources/images/floor3.jpg"
import { GLTFModelLoader } from "../../Components/ThreeModules/GLTFModelLoader"

export let addOpenDoorAni: Function
export let addCloseDoorAni: Function

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
    color: 0x272524,
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

  // text1.updateMatrix()
  // textGroup.merge(text1.geometry as Geometry, text1.matrix)

  // const textGroupMaterial = new THREE.MeshPhongMaterial({ color: "black" })
  // const textGroupMesh = new THREE.Mesh(textGroup, textGroupMaterial)
  // scene.add(textGroupMesh)

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

  // addLogoBox({ x: -500, y: 200, z: -940 }, reactLogo)
  // addLogoBox({ x: -500, y: -200, z: -940 }, styledComponentsLogo)
  // addLogoBox({ x: 700, y: 100, z: -940 }, netlifyLogo)
  // addLogoBox({ x: 700, y: -300, z: -940 }, jsLogo)

  const loader = new GLTFLoader(loadingManager)

  // 액자 모델 로드
  loader.load("/models/customs/js_frame.glb", (gltf) => {
    gltf.scene.scale.set(120, 120, 120)
    gltf.scene.position.set(700, -200, -940)
    gltf.scene.rotation.set(0, -Math.PI / 2, 0)

    scene.add(gltf.scene)
  })

  loader.load("/models/customs/styled_components_frame.glb", (gltf) => {
    gltf.scene.scale.set(120, 120, 120)
    gltf.scene.position.set(-500, -200, -940)
    gltf.scene.rotation.set(0, -Math.PI / 2, 0)

    scene.add(gltf.scene)
  })

  loader.load("/models/customs/netlify_frame.glb", (gltf) => {
    gltf.scene.scale.set(120, 120, 120)
    gltf.scene.position.set(675, 200, -940)
    gltf.scene.rotation.set(0, -Math.PI / 2, 0)

    scene.add(gltf.scene)
  })

  loader.load("/models/customs/react_frame.glb", (gltf) => {
    gltf.scene.scale.set(120, 120, 120)
    gltf.scene.position.set(-600, 200, -720)
    gltf.scene.rotation.set(0, -Math.PI / 2, 0)

    scene.add(gltf.scene)
  })

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
    gltf.scene.scale.set(120, 120, 120)
    gltf.scene.position.set(-1000, -500, 850)

    gltf.scene.rotateY(Math.PI)
    scene.add(gltf.scene)
  })

  // 방문 모델 로드

  loader.load("/models/animated_room/animated_room.glb", (gltf) => {
    gltf.scene.scale.set(300, 300, 300)
    gltf.scene.position.set(1200, -500, -1000)
    gltf.scene.rotateY(-Math.PI / 2)

    console.log(gltf)

    const mixer = new THREE.AnimationMixer(gltf.scene)

    const clips = gltf.animations
    function update() {
      console.log(mixer)
      mixer.update(0.02)
    }
    console.log(clips)
    const clip = THREE.AnimationClip.findByName(clips, "Door_0Action")

    const action = mixer.clipAction(clip)
    action.play()
    console.log(clip)

    // 문 열때 애니메이션
    addOpenDoorAni = () => {
      // 애니메이션 클립 초기화
      mixer.time = 0
      action.time = 0
      // 정순 애니메이션
      mixer.timeScale = 1
      const openDoorAni = setInterval(update, 1000 / 60)
      setTimeout(() => {
        clearInterval(openDoorAni)
      }, 1000)
    }

    // 문 닫을 때 애니메이션
    addCloseDoorAni = () => {
      // 역순 애니메이션
      mixer.timeScale = -1
      const closeDoorAni = setInterval(update, 1000 / 60)

      setTimeout(() => {
        clearInterval(closeDoorAni)
        mixer.setTime(0)
      }, 900)
    }

    scene.add(gltf.scene)
  })

  // 액자 모델 추가, 노마드 로고 그림 배치
  addFrame({
    imageUrl: nomadLogo,
    position: { x: 1480, y: 0, z: 0 },
    rotateY: -Math.PI,
  })

  // 천장과 벽지 이음새 생성
  addCeilConnector({
    scale: { x: 2, y: 3, z: 9.9 },
    depth: 200,
    position: { x: 1480, y: 490, z: -1000 },
    color: "black",
    rotation: {
      x: 0,
      y: 0,
      z: Math.PI / 2,
    },
  })

  addCeilConnector({
    scale: { x: 2, y: 3, z: 9.9 },
    depth: 200,
    position: { x: -1460, y: 490, z: -1000 },
    color: "black",
    rotation: {
      x: 0,
      y: 0,
      z: Math.PI,
    },
  })

  addCeilConnector({
    scale: { x: 2, y: 3, z: 9.9 },
    depth: 300,
    position: { x: -1460, y: 480, z: -970 },
    color: "black",
    rotation: {
      x: 0,
      y: Math.PI / 2,
      z: Math.PI / 2,
    },
  })

  addCeilConnector({
    scale: { x: 2, y: 3, z: 9.9 },
    depth: 300,
    position: { x: -1460, y: 485, z: 970 },
    color: "black",
    rotation: {
      x: 0,
      y: Math.PI / 2,
      z: -Math.PI / 2,
    },
  })

  // 바닥 이음새
  addCeilConnector({
    scale: { x: 2, y: 3, z: 9.9 },
    depth: 200,
    position: { x: 1480, y: -490, z: -1000 },
    color: "grey",
    rotation: {
      x: 0,
      y: 0,
      z: Math.PI / 2,
    },
  })

  addCeilConnector({
    scale: { x: 2, y: 3, z: 9.9 },
    depth: 200,
    position: { x: -1460, y: -490, z: -1000 },
    color: "grey",
    rotation: {
      x: 0,
      y: 0,
      z: Math.PI,
    },
  })

  addCeilConnector({
    scale: { x: 2, y: 3, z: 9.9 },
    depth: 300,
    position: { x: -1460, y: -480, z: -970 },
    color: "grey",
    rotation: {
      x: 0,
      y: Math.PI / 2,
      z: Math.PI / 2,
    },
  })

  addCeilConnector({
    scale: { x: 2, y: 3, z: 9.9 },
    depth: 300,
    position: { x: -1460, y: -485, z: 970 },
    color: "grey",
    rotation: {
      x: 0,
      y: Math.PI / 2,
      z: -Math.PI / 2,
    },
  })

  // 선택 버튼 생성

  // J-Flix 방 포커싱
  addSelectBtn({
    text: "0",
    btnPosition: { x: 0, y: 300, z: 1000 },
    cameraPosition: { x: -2773.8192101111504, y: 490.0248603839669, z: 4120.7527992239675 },
    targetPosition: { x: 0, y: 0, z: 0 },
    zoomIndex: 0.3,
  })

  // tv 포커싱

  addSelectBtn({
    text: "1",
    btnPosition: { x: -1300, y: 500, z: 500 },
    cameraPosition: window.matchMedia("(max-width: 500px)").matches
      ? { x: 1400, y: 300, z: 0 }
      : { x: 1000, y: 300, z: 0 },
    targetPosition: { x: 600, y: 250, z: 0 },
    zoomIndex: window.matchMedia("(max-width: 850px)").matches ? 0.15 : 0.3, // 850px 보다 width가 작을 때 축소
  })

  // 프로젝트 설명 포커싱
  addSelectBtn({
    text: "📄",
    btnPosition: { x: 0, y: 300, z: -800 },
    cameraPosition: { x: 0, y: 900, z: 300 },
    targetPosition: { x: 0, y: 900, z: -100 },
    zoomIndex: 0.1,
  })

  // 채널 변경 버튼 & tv 포커싱
  addSelectBtn({
    text: "✨",
    btnPosition: { x: -1300, y: 500, z: 300 },
    cameraPosition: window.matchMedia("(max-width: 500px)").matches
      ? { x: 1400, y: 300, z: 0 }
      : { x: 1000, y: 300, z: 0 },
    targetPosition: { x: 600, y: 250, z: 0 },
    zoomIndex: window.matchMedia("(max-width: 850px)").matches ? 0.15 : 0.3, // 850px 보다 width가 작을 때 축소
  })

  addFloor({ width: 3000, height: 2000, x: 0, y: -490, z: 0, imageSrc: floorImage3 }) // J-Flix 바닥

  // 창문 빛으로 밝히기
  const windowLight = new THREE.RectAreaLight(0xffffff)
  windowLight.position.set(-1000, 1300, 700)
  windowLight.intensity = 200
  windowLight.width = 500
  windowLight.height = 500
  windowLight.lookAt(-750, 975, 500)
  scene.add(windowLight)

  // 벽에 붙일 책 모형
  loader.load("/models/book/scene.gltf", (gltf) => {
    gltf.scene.scale.set(1000, 1000, 1000)
    gltf.scene.rotateX(Math.PI / 2)
    gltf.scene.position.set(-300, 0, -900)
    scene.add(gltf.scene)
  })
  const bookCoverMesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(720, 1000, 40),
    new THREE.MeshPhongMaterial({ color: 0x292a2e, specular: "orange", flatShading: true })
  )
  bookCoverMesh.position.set(100, 0, -890)
  bookCoverMesh.material.side = THREE.DoubleSide
  scene.add(bookCoverMesh)
}
