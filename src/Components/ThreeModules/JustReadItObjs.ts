import { scene } from "../ThreeScene"
import * as THREE from "three"
import { BackSide, DoubleSide } from "three"
import { GLTFModelLoader } from "./GLTFModelLoader"
import { FontLoder } from "./FontLoader"
import addDescriptionBoard from "./DescriptionBoard"
import { addSelectBtn } from "./SelectBtn"
import { addLogoBox } from "./LogoBox"
import nodeLogo from "../../resources/images/nodeLogo.jpg"
import mongoLogo from "../../resources/images/mongoLogo.jpg"
import jsLogo from "../../resources/images/vanillajs.png"
import herokuLogo from "../../resources/images/herokuLogo.png"

export const JustReadItObjs = () => {
  const IntroVideo = document.createElement("video")
  IntroVideo.src = "/videos/just-read-it.mp4"
  IntroVideo.autoplay = true
  IntroVideo.loop = true

  const videoTexture = new THREE.VideoTexture(IntroVideo)
  videoTexture.minFilter = THREE.LinearFilter
  videoTexture.magFilter = THREE.LinearFilter
  videoTexture.format = THREE.RGBFormat
  const rectangleGeo = new THREE.PlaneBufferGeometry(1600, 900)
  const rectangleMat = new THREE.MeshBasicMaterial({ map: videoTexture, toneMapped: false })
  rectangleMat.side = DoubleSide
  videoTexture.needsUpdate = true
  rectangleMat.needsUpdate = true

  const videoMesh = new THREE.Mesh(rectangleGeo, rectangleMat)
  videoMesh.rotateY(Math.PI / 2)
  videoMesh.position.set(-4300, 500, -2500)
  scene.add(videoMesh)

  // 프로젝트 설명 보드
  addDescriptionBoard({
    siteUrl: "https://just-read-it.herokuapp.com/",
    width: "500px",
    height: "400px",
    title: "Just Read It",
    titleColor: "orange",
    description:
      "node.js-express 서버와 자바스크립트 연습용 프로젝트입니다. 첫 사이드 프로젝트여서 현재는 도저히 수정이 힘들 정도로 코드 퀄리티가 안좋지만, 여러가지 신기한 기능이 들어간 프로젝트입니다.",
    position: { x: -4300, y: -200, z: -3300 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
  })

  // 스켈레톤 책장 모델
  GLTFModelLoader(
    "/models/bookshelf_household_props_12 (1)/scene.gltf",
    { x: 1, y: 1, z: 1 },
    { x: -2000, y: -500, z: -4000 },
    { x: 0, y: 0, z: 0 }
  )

  // 일반 책장 모델
  GLTFModelLoader(
    "/models/the_witchs_bookshelf/scene.gltf",
    { x: 100, y: 100, z: 100 },
    { x: -3500, y: -500, z: -3900 },
    { x: 0, y: -Math.PI / 2, z: 0 }
  )

  // 책상 모델
  GLTFModelLoader(
    "/models/table_with_things/scene.gltf",
    { x: 80, y: 80, z: 80 },
    { x: -3000, y: -500, z: -2500 },
    { x: 0, y: -Math.PI / 2, z: 0 }
  )

  // 의자 모델
  GLTFModelLoader(
    "/models/office_chair/scene.gltf",
    { x: 6, y: 6, z: 6 },
    { x: -2300, y: -400, z: -2000 },
    { x: 0, y: Math.PI / 2, z: 0 }
  )

  // 방 제목 폰트모델
  FontLoder(
    {
      fontModelUrl: "/fonts/helvetiker_regular.typeface.json",
      text: "Just-Read-It",
      size: 80,
      height: 50,
      color: 0xff991f,
      bevelSize: 7,
    },
    { x: -3500, y: 700, z: -4000 }
  )

  // Just-Read-It 포커싱
  addSelectBtn({
    text: "4",
    btnPosition: { x: -1500, y: 0, z: -3000 },
    cameraPosition: { x: -2000, y: 500, z: -2500 },
    targetPosition: { x: -3000, y: 500, z: -2500 },
    zoomIndex: 0.2,
  })

  addLogoBox({ x: -2700, y: 500, z: -1100 }, nodeLogo)
  addLogoBox({ x: -3000, y: 500, z: -1100 }, mongoLogo)
  addLogoBox({ x: -3000, y: 200, z: -1100 }, jsLogo)
  addLogoBox({ x: -2700, y: 200, z: -1100 }, herokuLogo)
}
