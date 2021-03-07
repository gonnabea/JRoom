import { addLogoBox } from "./LogoBox"
import { addSelectBtn } from "./SelectBtn"
import opencvLogo from "../../resources/images/opencvLogo.png"
import socketioLogo from "../../resources/images/socketioLogo.png"
import webrtcLogo from "../../resources/images/webrtcLogo.png"
import pythonLogo from "../../resources/images/pythonLogo.jpg"
import flaskLogo from "../../resources/images/flaskLogo.png"
import mysqlLogo from "../../resources/images/mysqlLogo.png"

const onObjects = () => {
  addSelectBtn({
    text: "5",
    btnPosition: { x: 1000, y: 0, z: -2500 },
    targetPosition: { x: 3000, y: 300, z: -2000 },
    zoomIndex: 0.2,
    cameraPosition: { x: 2500, y: 300, z: -2000 },
  })

  addLogoBox({ x: 2700, y: 500, z: -3900 }, opencvLogo)
  addLogoBox({ x: 3000, y: 500, z: -3900 }, socketioLogo)
  addLogoBox({ x: 3300, y: 500, z: -3900 }, webrtcLogo)
  addLogoBox({ x: 2700, y: 200, z: -3900 }, pythonLogo)
  addLogoBox({ x: 3000, y: 200, z: -3900 }, flaskLogo)
  addLogoBox({ x: 3300, y: 200, z: -3900 }, mysqlLogo)
}
export default onObjects
