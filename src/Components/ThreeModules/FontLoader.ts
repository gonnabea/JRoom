import * as THREE from "three"
import { Geometry, TextBufferGeometry, TextGeometry } from "three"
import { loadingManager, scene } from "../../Screen/ThreeScreens/ThreeScene"

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
  const fontLoader = new THREE.FontLoader(loadingManager)
  fontLoader.load(params.fontModelUrl, (font) => {
    const geometry = new THREE.TextGeometry(params.text, {
      font,
      size: params.size,
      height: params.height,
      curveSegments: 3,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: params.bevelSize,
      bevelOffset: 0,
      bevelSegments: 3,
    })
    const material = new THREE.MeshPhongMaterial({
      color: params.color,
      specular: "black",
      flatShading: true,
    })

    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(position.x, position.y, position.z)

    // textGroup.merge(mesh.geometry as TextGeometry, mesh.matrix)
    if (rotation) {
      mesh.rotation.set(rotation.x, rotation.y, rotation.z)
    }
    scene.add(mesh)
  })
}
