import { addLogoBox } from "./LogoBox"
import { addSelectBtn } from "./SelectBtn"
import opencvLogo from "../../resources/images/opencvLogo.png"
import socketioLogo from "../../resources/images/socketioLogo.png"
import webrtcLogo from "../../resources/images/webrtcLogo.png"
import pythonLogo from "../../resources/images/pythonLogo.jpg"
import flaskLogo from "../../resources/images/flaskLogo.png"
import mysqlLogo from "../../resources/images/mysqlLogo.png"
import addDescriptionBoard from "./DescriptionBoard"
import { GLTFModelLoader } from "./GLTFModelLoader"
import addIframeObj from "./iframeObj"

const onObjects = () => {
  addSelectBtn({
    text: "5",
    btnPosition: { x: 1000, y: 0, z: -2500 },
    targetPosition: { x: 3000, y: 300, z: -2000 },
    zoomIndex: 0.2,
    cameraPosition: { x: 2500, y: 300, z: -2000 },
  })

  // 기술스택 박스 로드
  addLogoBox({ x: 2700, y: 500, z: -3900 }, opencvLogo)
  addLogoBox({ x: 3000, y: 500, z: -3900 }, socketioLogo)
  addLogoBox({ x: 3300, y: 500, z: -3900 }, webrtcLogo)
  addLogoBox({ x: 2700, y: 200, z: -3900 }, pythonLogo)
  addLogoBox({ x: 3000, y: 200, z: -3900 }, flaskLogo)
  addLogoBox({ x: 3300, y: 200, z: -3900 }, mysqlLogo)

  // 스마트폰 모델 로드
  GLTFModelLoader({
    modelUrl: "/models/smartphone/scene.gltf",
    scale: { x: 600, y: 600, z: 600 },
    position: { x: 4100, y: 400, z: -2700 },
    rotation: { x: 0, y: -Math.PI / 2.5, z: 0 },
  })

  addIframeObj({
    siteUrl: "https://our-now.herokuapp.com/#/",
    position: { x: 4000, y: 400, z: -2700 },
    width: 800,
    height: 1200,
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
  })

  addDescriptionBoard({
    siteUrl: "https://our-now.herokuapp.com/",
    width: "600px",
    height: "400px",
    title: "ON",
    titleColor: "purple",
    description:
      "카카오톡과 같이 실시간 채팅과 1:1, 다대다 채팅이 가능하며, 화상통화 기능과 얼굴인식을 통환 효과 각종 영상처리 넣기를 지원하는 웹입니다.",
    position: { x: 4000, y: 300, z: -2000 },
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
  })
}
export default onObjects
