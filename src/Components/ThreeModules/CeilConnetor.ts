import { scene } from "../ThreeScene"
import * as THREE from "three"
import { BackSide, FrontSide } from "three"

// 천장과 벽지 이음새
export const addCeilConnector = (
  scale: { x: number; y: number; z: number },
  depth: number,
  position: { x: number; y: number; z: number },
  color: string,
  rotation: { x: number; y: number; z: number }
) => {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(10, 0)
  shape.lineTo(10, 10)

  const setting = {
    steps: 2,
    depth,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 10,
    bevelOffset: 0,
    bevelSegments: 1,
  }

  const geometry = new THREE.ExtrudeGeometry(shape, setting)
  const material = new THREE.MeshBasicMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.scale.set(scale.x, scale.y, scale.z)
  mesh.rotation.set(rotation.x, rotation.y, rotation.z)
  mesh.position.set(position.x, position.y, position.z)
  material.side = FrontSide
  scene.add(mesh)
}
