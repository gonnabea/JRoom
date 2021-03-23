import * as THREE from "three"
import { scene } from "../../Screen/ThreeScreens/ThreeScene"

export let logoBoxesMesh: THREE.Mesh

export const addLogoBox = (position: { x: number; y: number; z: number }, image: string) => {
  const logoBoxGeo = new THREE.BoxGeometry(300, 300, 100, 1, 1, 1)
  const logoBoxTexture = new THREE.TextureLoader().load(image)
  const logoBoxMat = new THREE.MeshPhongMaterial({
    map: logoBoxTexture,
    specular: "black",
    flatShading: true,
  })

  const logoBox = new THREE.Mesh(logoBoxGeo, logoBoxMat)

  // logoBoxMaterials.push(logoBoxMat)
  logoBox.position.set(position.x, position.y, position.z)
  // logoBox.updateMatrix()
  // logoBoxGroup.merge(logoBox.geometry as Geometry, logoBox.matrix, boxIndex)
  // console.log(logoBoxMaterials[boxIndex])
  // boxIndex += 1
  // logoBoxesMesh = new THREE.Mesh(logoBoxGroup, logoBoxMaterials)
  scene.add(logoBox)
}
