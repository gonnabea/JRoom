import { scene } from "../ThreeScene"
import * as THREE from "three"
import { BackSide, DoubleSide } from "three"
import { GLTFModelLoader } from "./GLTFModelLoader"

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

  GLTFModelLoader(
    "/models/bookshelf_household_props_12 (1)/scene.gltf",
    { x: 1, y: 1, z: 1 },
    { x: -2000, y: -500, z: -4000 },
    { x: 0, y: 0, z: 0 }
  )

  GLTFModelLoader(
    "/models/the_witchs_bookshelf/scene.gltf",
    { x: 100, y: 100, z: 100 },
    { x: -3500, y: -500, z: -3900 },
    { x: 0, y: -Math.PI / 2, z: 0 }
  )
}
