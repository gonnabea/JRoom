import * as THREE from "three"
import { FlatShading } from "three"
import { scene } from "../ThreeScene"

export const addLogoBox = (position: { x: number; y: number; z: number }, image: string) => {
  const logoBoxGeo = new THREE.BoxBufferGeometry(300, 300, 100, 1, 1, 1)
  const logoBoxTexture = new THREE.TextureLoader().load(image)
  const logoBoxMat = new THREE.MeshBasicMaterial({
    map: logoBoxTexture,
  })
  const logoBox = new THREE.Mesh(logoBoxGeo, logoBoxMat)
  logoBox.receiveShadow = true
  logoBox.castShadow = true

  logoBox.position.set(position.x, position.y, position.z)
  scene.add(logoBox)
}
