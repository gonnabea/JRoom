import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { scene } from "../ThreeScene"

const loader = new GLTFLoader()

export const GLTFModelLoader = (
  modelUrl: string,
  scale: { x: number; y: number; z: number },
  position: { x: number; y: number; z: number },
  rotation: { x: number; y: number; z: number }
) => {
  loader.load(modelUrl, (gltf) => {
    gltf.scene.scale.set(scale.x, scale.y, scale.z)
    gltf.scene.position.set(position.x, position.y, position.z)
    gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z)

    scene.add(gltf.scene)
  })
}
