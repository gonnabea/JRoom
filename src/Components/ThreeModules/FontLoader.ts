import * as THREE from "three"
import { scene } from "../../Screen/ThreeScreens/ThreeScene"

export const FontLoder = (
  params: {
    fontModelUrl: string
    text: string
    size: number
    height: number
    color: number
    bevelSize: number
  },
  position: { x: number; y: number; z: number },
  rotation?: { x: number; y: number; z: number }
) => {
  const fontLoader = new THREE.FontLoader()
  fontLoader.load(params.fontModelUrl, (font) => {
    const geometry = new THREE.TextBufferGeometry(params.text, {
      font,
      size: params.size,
      height: params.height,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: params.bevelSize,
      bevelOffset: 0,
      bevelSegments: 5,
    })
    const material = new THREE.MeshPhongMaterial({
      color: params.color,
      specular: "orange",
      flatShading: true,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(position.x, position.y, position.z)
    if (rotation) {
      mesh.rotation.set(rotation.x, rotation.y, rotation.z)
    }
    scene.add(mesh)
  })
}
