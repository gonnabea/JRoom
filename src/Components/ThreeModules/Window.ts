import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { scene } from "../../Screen/ThreeScreens/ThreeScene"
import * as THREE from "three"

const loader = new GLTFLoader()

export const addWindow = (
  position: { x: number; y: number; z: number },
  scale: { x: number; y: number; z: number },
  rotation: { x: any; y: any; z: any }
) => {
  loader.load("/models/window1/window.gltf", (gltf) => {
    console.log(gltf)
    gltf.scene.position.set(position.x, position.y, position.z)
    gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z)
    gltf.scene.scale.set(scale.x, scale.y, scale.z)
    scene.add(gltf.scene)
  })
}
