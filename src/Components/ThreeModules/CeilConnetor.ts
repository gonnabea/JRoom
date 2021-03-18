import { scene } from "../../Screen/ThreeScreens/ThreeScene"
import * as THREE from "three"
import { BackSide, FrontSide, Geometry } from "three"

export let connectorsMesh: THREE.Mesh
const ceilConnectorGroup = new THREE.Geometry()
// 천장과 벽지 이음새
export const addCeilConnector = (props: {
  scale: { x: number; y: number; z: number }
  depth: number
  position: { x: number; y: number; z: number }
  color: string
  rotation: { x: number; y: number; z: number }
}) => {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(10, 0)
  shape.lineTo(10, 10)

  const setting = {
    steps: 2,
    depth: props.depth,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 10,
    bevelOffset: 0,
    bevelSegments: 1,
    curveSegments: 1,
  }

  const geometry = new THREE.ExtrudeGeometry(shape, setting)
  const material = new THREE.MeshBasicMaterial({ color: props.color })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.scale.set(props.scale.x, props.scale.y, props.scale.z)
  mesh.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)
  mesh.position.set(props.position.x, props.position.y, props.position.z)
  material.side = FrontSide

  mesh.updateMatrix()
  ceilConnectorGroup.merge(mesh.geometry as Geometry, mesh.matrix)

  const connectorsMaterial = new THREE.MeshPhongMaterial({ color: "black" })
  connectorsMesh = new THREE.Mesh(ceilConnectorGroup, connectorsMaterial)
}
