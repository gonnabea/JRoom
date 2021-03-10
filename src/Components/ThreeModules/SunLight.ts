import * as THREE from "three"
import { scene, camera, renderer } from "../../Screen/ThreeScreens/ThreeScene"
import { GodRaysEffect, RenderPass, EffectPass, EffectComposer } from "postprocessing"

export const addSunLight = (position: { x: number; y: number; z: number }) => {
  const CylinderGeometry = new THREE.CylinderGeometry(3, 4, 20, 32)
  console.log(CylinderGeometry)

  // netlify에서 geometry.faces 프로퍼티를 인식하지 못하여 조치
  ;(CylinderGeometry as any).faces.splice(0, 1)
  ;(CylinderGeometry as any).faces.splice(4, 1)
  ;(CylinderGeometry as any).faces.splice(8, 1)
  ;(CylinderGeometry as any).faces.splice(12, 1)
  ;(CylinderGeometry as any).faces.splice(16, 1)
  ;(CylinderGeometry as any).faces.splice(20, 1)
  ;(CylinderGeometry as any).faces.splice(24, 1)
  ;(CylinderGeometry as any).faces.splice(28, 1)
  ;(CylinderGeometry as any).faces.splice(32, 1)
  ;(CylinderGeometry as any).faces.splice(40, 1)
  ;(CylinderGeometry as any).faces.splice(44, 1)
  ;(CylinderGeometry as any).faces.splice(48, 1)
  ;(CylinderGeometry as any).faces.splice(52, 1)

  const CylinderMaterial = new THREE.MeshBasicMaterial({
    color: 0xf2f1c7,
  })
  CylinderMaterial.transparent = true
  CylinderMaterial.opacity = 0.1
  const CylinderMesh = new THREE.Mesh(CylinderGeometry, CylinderMaterial)
  CylinderMesh.scale.set(60, 100, 90)
  CylinderMesh.position.set(position.x, position.y, position.z)
  CylinderGeometry.rotateZ(0)
  CylinderGeometry.rotateX(Math.PI / 6)
  CylinderGeometry.rotateY(-Math.PI / 4)

  scene.add(CylinderMesh)
  const godraysEffect = new GodRaysEffect(camera, CylinderMesh, {
    resolutionScale: 1,
    density: 0.9,
    decay: 0.9,
    weight: 0.5,
    samples: 100,
    blurriness: 10,
    opacity: 1,
  })

  const renderPass = new RenderPass(scene, camera)
  const effectPass = new EffectPass(camera, godraysEffect)
  effectPass.renderToScreen = true

  // 어떻게 글로벌 변수인 composer를 모듈로 불어올 것인가?
  const composer = new EffectComposer(renderer)
  composer.addPass(renderPass)
  composer.addPass(effectPass)

  return composer
}
