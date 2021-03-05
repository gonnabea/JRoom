import { scene } from "../ThreeScene"
import * as THREE from "three"

export const addDirLight = (
  position: { x: number; y: number; z: number },
  targetPosition: { x: number; y: number; z: number }
) => {
  const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.position.set(position.x, position.y, position.z)
  dirLight.castShadow = true

  dirLight.shadow.camera.near = 1 // same as the camera
  dirLight.shadow.camera.far = 21000 // same as the camera

  dirLight.shadow.mapSize.width = 2048
  dirLight.shadow.mapSize.height = 2048

  var side = 100
  dirLight.shadow.camera.top = side
  dirLight.shadow.camera.bottom = -side
  dirLight.shadow.camera.left = side
  dirLight.shadow.camera.right = -side
  dirLight.shadow.camera.visible = true

  dirLight.target.position.set(targetPosition.x, targetPosition.y, targetPosition.z)
  dirLight.target.updateMatrixWorld()

  const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 300, 0xa0c2f9)
  dirLightHelper.update()

  scene.add(dirLight, dirLight.target)
  scene.add(dirLightHelper)
}
