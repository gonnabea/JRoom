import * as THREE from "three"
import { CSG } from "three-csg-ts"
import { scene } from "../ThreeScene"

export const addRoofWindowHole = (
  roofMesh: THREE.Mesh<THREE.ExtrudeGeometry, THREE.MeshPhongMaterial>
) => {
  const roofWindowHole = new THREE.Mesh(
    new THREE.BoxBufferGeometry(600, 500, 600, 1, 1, 1),
    new THREE.MeshPhongMaterial()
  )
  const roofWindowHole2 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(600, 500, 600, 1, 1, 1),
    new THREE.MeshPhongMaterial()
  )
  const roofWindowHole3 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(600, 500, 600, 1, 1, 1),
    new THREE.MeshPhongMaterial()
  )
  const roofWindowHole4 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(600, 500, 700, 1, 1, 1),
    new THREE.MeshPhongMaterial()
  )
  const JFlixDoorHole = new THREE.Mesh(
    new THREE.BoxBufferGeometry(600, 500, 700, 1, 1, 1),
    new THREE.MeshPhongMaterial()
  )

  roofWindowHole.rotateZ(-Math.PI / 4)
  roofWindowHole2.rotateZ(-Math.PI / 4)
  roofWindowHole3.rotateZ(-Math.PI / 4)
  roofWindowHole4.rotateZ(Math.PI / 4)

  roofWindowHole.position.set(500, 1500, 750)
  roofWindowHole2.position.set(500, 1500, 1500)
  roofWindowHole3.position.set(500, 1500, 2250)
  roofWindowHole4.position.set(500, 700, 1500)

  roofMesh.updateMatrix()
  roofWindowHole.updateMatrix()
  roofWindowHole2.updateMatrix()
  roofWindowHole3.updateMatrix()
  roofWindowHole4.updateMatrix()

  // 첫번째 창문 구멍 생성
  const bspWindowHole = CSG.fromMesh(roofWindowHole)
  const bspRoof = CSG.fromMesh(roofMesh)

  const bspResult = bspRoof.subtract(bspWindowHole)

  const bspMeshResult = CSG.toMesh(bspResult, roofMesh.matrix)

  bspMeshResult.material = roofMesh.material
  // netlify에서 geometry.faces 프로퍼티를 인식하지 못하여 조치
  // face 목록 중 가장 끝의 것들만 제거하면 패인 부분을 제거할 수 있음
  ;(bspMeshResult as any).geometry.faces.splice(97, 40)

  // 두번째 창문 구멍 생성

  const bspWindowHole2 = CSG.fromMesh(roofWindowHole2)
  const bspRoof2 = CSG.fromMesh(bspMeshResult)

  const bspResult2 = bspRoof2.subtract(bspWindowHole2)
  const bspMeshResult2 = CSG.toMesh(bspResult2, bspMeshResult.matrix)
  bspMeshResult2.material = roofMesh.material
  // netlify에서 geometry.faces 프로퍼티를 인식하지 못하여 조치
  ;(bspMeshResult2 as any).geometry.faces.splice(97, 16)

  // 세번쨰 창문 구멍 생성

  const bspWindowHole3 = CSG.fromMesh(roofWindowHole3)
  const bspRoof3 = CSG.fromMesh(bspMeshResult2)

  const bspResult3 = bspRoof3.subtract(bspWindowHole3)
  const bspMeshResult3 = CSG.toMesh(bspResult3, bspMeshResult.matrix)
  bspMeshResult3.material = roofMesh.material
  // netlify에서 geometry.faces 프로퍼티를 인식하지 못하여 조치
  ;(bspMeshResult3 as any).geometry.faces.splice(97, 18)

  bspMeshResult3.rotateZ(Math.PI / 2)
  bspMeshResult3.rotateX(Math.PI / 2)
  bspMeshResult3.position.set(-1500, 510, -1000)
  bspMeshResult3.material.side = THREE.DoubleSide

  scene.add(bspMeshResult3)

  // 네번째 창문 구멍 생성
  // const bspWindowHole4 = CSG.fromMesh(roofWindowHole4)
  // const bspRoof4 = CSG.fromMesh(bspMeshResult3)

  // const bspResult4 = bspRoof4.subtract(bspWindowHole4)
  // const bspMeshResult4 = CSG.toMesh(bspResult4, bspMeshResult.matrix)
  // bspMeshResult4.material = roofMesh.material

  // console.log(bspMeshResult4.geometry.faces)
  // bspMeshResult4.geometry.faces.splice(190, 15)

  // scene.add(bspMeshResult4)
}
