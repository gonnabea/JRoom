import { scene } from "../ThreeScene"
import * as THREE from "three"
import { BackSide, DoubleSide } from "three"

export const JustReadItObjs = () => {
  const IntroVideo = document.createElement("video")
  IntroVideo.src = "/videos/just-read-it.mp4"
  IntroVideo.autoplay = true
  IntroVideo.loop = true

  const videoTexture = new THREE.VideoTexture(IntroVideo)
  videoTexture.minFilter = THREE.LinearFilter
  videoTexture.magFilter = THREE.LinearFilter
  videoTexture.format = THREE.RGBFormat
  const rectangleGeo = new THREE.PlaneBufferGeometry(1600, 900)
  const rectangleMat = new THREE.MeshBasicMaterial({ map: videoTexture, toneMapped: false })
  rectangleMat.side = DoubleSide
  videoTexture.needsUpdate = true
  rectangleMat.needsUpdate = true

  const videoMesh = new THREE.Mesh(rectangleGeo, rectangleMat)
  videoMesh.rotateY(Math.PI / 2)
  videoMesh.position.set(-4300, 0, -2500)
  scene.add(videoMesh)
}
