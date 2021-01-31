import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { scene } from "../ThreeScene"
import { FontLoder } from "./FontLoader"
import { addLogoBox } from "./LogoBox"

import reactLogo from "../../resources/images/reactLogo.jpg"
import styledComponentsLogo from "../../resources/images/styledComponents.jpg"
import netlifyLogo from "../../resources/images/netlify.jpg"
import jsLogo from "../../resources/images/vanillajs.png"
import sunsetImg1 from "../resources/images/Sunset Backgrounds/sunset12.jpg"

export const JFlixObjects = () => {
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

  // 소파 모델 로드

  loader.load("/models/sofa/scene.gltf", (gltf) => {
    gltf.scene.scale.set(220, 220, 220)
    gltf.scene.position.set(0, -500, 100)

    gltf.scene.rotateY(Math.PI)

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
}
