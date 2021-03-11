import { addLogoBox } from "../../Components/ThreeModules/LogoBox"
import { addSelectBtn } from "../../Components/ThreeModules/SelectBtn"
import opencvLogo from "../../resources/images/opencvLogo.png"
import socketioLogo from "../../resources/images/socketioLogo.png"
import webrtcLogo from "../../resources/images/webrtcLogo.png"
import pythonLogo from "../../resources/images/pythonLogo.jpg"
import flaskLogo from "../../resources/images/flaskLogo.png"
import mysqlLogo from "../../resources/images/mysqlLogo.png"
import addDescriptionBoard from "../../Components/ThreeModules/DescriptionBoard"
import { GLTFModelLoader } from "../../Components/ThreeModules/GLTFModelLoader"
import addIframeObj from "../../Components/ThreeModules/iframeObj"
import { FontLoder } from "../../Components/ThreeModules/FontLoader"
import { scene } from "./ThreeScene"
import { addFloor } from "../../Components/ThreeModules/floor"
import floorImage3 from "../../resources/images/floor3.jpg"
import { addFrame } from "../../Components/ThreeModules/Frame"
import chatImg from "../../resources/images/chat.jpg"

const onObjects = () => {
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
    scale: { x: 950, y: 800, z: 600 },
    position: { x: 4100, y: 400, z: -2400 },
    rotation: { x: Math.PI / 2, y: -Math.PI / 2.5, z: 0 },
  })

  // iframe 웹사이트 로드
  addIframeObj({
    siteUrl: "https://our-now.herokuapp.com/#/",
    position: { x: 4000, y: 400, z: -2380 },
    width: 1200,
    height: 800,
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
  })

  // 프로젝트 설명 보드 로드
  addDescriptionBoard({
    siteUrl: "https://our-now.herokuapp.com/",
    width: "600px",
    height: "400px",
    title: "ON",
    titleColor: "purple",
    description:
      "카카오톡과 같이 실시간 채팅과 1:1, 다대다 채팅이 가능하며, 화상통화 기능과 얼굴인식을 통환 효과 각종 영상처리 넣기를 지원하는 웹입니다.",
    position: { x: 4000, y: 1000, z: -1950 },
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
  })
  // 메세지 아이콘 모델 로드
  GLTFModelLoader({
    modelUrl: "/models/digital_message_icon/scene.gltf",
    scale: { x: 200, y: 200, z: 200 },
    position: { x: 3000, y: 500, z: -1100 },
    rotation: { x: 0, y: 0, z: 0 },
  })

  // 프로젝트 제목 폰트모델
  FontLoder(
    {
      fontModelUrl: "/fonts/helvetiker_regular.typeface.json",
      text: "ON",
      size: 80,
      height: 50,
      color: 0x07e5fd,
      bevelSize: 7,
    },
    { x: 3300, y: 1000, z: -1100 },
    { x: 0, y: Math.PI, z: 0 }
  )

  // 수납장 모델 로드
  GLTFModelLoader({
    modelUrl: "/models/foyer_table/scene.gltf",
    scale: { x: 5, y: 5, z: 5 },
    position: { x: 3000, y: -500, z: -1100 },
    rotation: { x: 0, y: Math.PI, z: 0 },
  })

  // 테이블 모델 로드
  GLTFModelLoader({
    modelUrl: "/models/square_dining_table/scene.gltf",
    scale: { x: 8, y: 8, z: 8 },
    position: { x: 3000, y: -400, z: -2500 },
    rotation: { x: 0, y: -Math.PI / 2, z: 0 },
  })

  // 방문 모델 로드
  GLTFModelLoader({
    modelUrl: "/models/door/scene.gltf",
    scale: { x: 600, y: 300, z: 300 },
    position: { x: 1520, y: -500, z: -3000 },
    rotation: { x: 0, y: 0, z: 0 },
  })

  addSelectBtn({
    text: "5",
    btnPosition: { x: 1520, y: 0, z: -3000 },
    targetPosition: { x: 3000, y: 500, z: -2500 },
    zoomIndex: 0.2,
    cameraPosition: { x: 2000, y: 500, z: -2500 },
  })

  addFloor({ width: 3000, height: 2900, x: -3000, y: -490, z: -2500, imageSrc: floorImage3 }) // Our-Now 바닥

  addFrame({
    position: { x: 1520, y: 400, z: -1800 },
    imageUrl: chatImg,
    rotateY: 0,
  })
}
export default onObjects
