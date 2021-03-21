import * as THREE from "three"
import { scene } from "../../Screen/ThreeScreens/ThreeScene"

export const addSpotLight = (
  position: { x: number; y: number; z: number },
  targetPosition: { x: number; y: number; z: number },
  angle: number
) => {
  const spotLight_distance = 0 // 빛의 최대범위
  const spotLight = new THREE.SpotLight(0xffffff, 1.5, spotLight_distance, angle)
  spotLight.penumbra = 1
  spotLight.decay = 0.5
  // 창문 위치
  spotLight.position.set(position.x, position.y, position.z)
  spotLight.target.position.set(targetPosition.x, targetPosition.y, targetPosition.z)
  spotLight.target.updateMatrixWorld()

  // 라이트 헬퍼
  // const spotLightHelper = new THREE.SpotLightHelper(spotLight)
  // scene.add(spotLightHelper)

  scene.add(spotLight)
}
