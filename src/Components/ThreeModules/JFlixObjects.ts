import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { scene } from "../ThreeScene"
import { FontLoder } from "./FontLoader"
import { addLogoBox } from "./LogoBox"

import reactLogo from "../../resources/images/reactLogo.jpg"
import styledComponentsLogo from "../../resources/images/styledComponents.jpg"
import netlifyLogo from "../../resources/images/netlify.jpg"
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
      bevelSize: 8,
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

  // 기술스택 박스 만들기

  addLogoBox({ x: -500, y: 200, z: -940 }, reactLogo)
  addLogoBox({ x: -500, y: -200, z: -940 }, styledComponentsLogo)
  addLogoBox({ x: 700, y: 100, z: -940 }, netlifyLogo)

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
}
