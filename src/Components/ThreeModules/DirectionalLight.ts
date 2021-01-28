import { scene } from "../ThreeScene"
import * as THREE from "three"

export const addDirLight = (
  position: { x: number; y: number; z: number },
  targetPosition: { x: number; y: number; z: number }
) => {
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.4)
  dirLight.position.set(position.x, position.y, position.z)
  dirLight.castShadow = true

  dirLight.target.position.set(targetPosition.x, targetPosition.y, targetPosition.z)
  dirLight.target.updateMatrixWorld()

  const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 300, 0xa0c2f9)
  dirLightHelper.update()

  scene.add(dirLight, dirLight.target)
  scene.add(dirLightHelper)
}
