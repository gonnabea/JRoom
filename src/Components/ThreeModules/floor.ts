import * as THREE from "three"
import { scene } from "../ThreeScene"
import floorImage2 from "../../resources/images/floor2.jpg"

interface typeAddFloor {
  width: number
  height: number
  position?: object
  x: number
  y: number
  z: number
}

export const addFloor = ({ width, height, x, y, z }: typeAddFloor) => {
  const floorGeo = new THREE.PlaneBufferGeometry(width, height) // width, height
  const floorTexture = new THREE.TextureLoader().load(floorImage2)
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
  floorTexture.repeat.set(5, 5)
  floorTexture.encoding = THREE.sRGBEncoding

  //바닥 반사 효과
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(640, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  })

  const floorCamera = new THREE.CubeCamera(500, 1500, cubeRenderTarget)
  floorCamera.position.set(0, 0, 0)
  scene.add(floorCamera)

  const sphereMaterial = new THREE.MeshPhongMaterial({
    envMap: cubeRenderTarget.texture,

    flatShading: true,
  })

  const floorMesh = new THREE.Mesh(floorGeo, sphereMaterial)
  floorMesh.position.set(0, 100, 0)

  floorMesh.rotateX(-Math.PI / 2) // -90도 로테이션
  floorMesh.position.set(x, y, z) // 위치 조정
  scene.add(floorMesh)
}
