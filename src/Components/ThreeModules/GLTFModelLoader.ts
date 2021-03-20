import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { scene } from "../../Screen/ThreeScreens/ThreeScene"

const loader = new GLTFLoader()

export const GLTFModelLoader = (props: {
  modelUrl: string
  scale: { x: number; y: number; z: number }
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
}) => {
  loader.load(props.modelUrl, (gltf) => {
    gltf.scene.scale.set(props.scale.x, props.scale.y, props.scale.z)
    gltf.scene.position.set(props.position.x, props.position.y, props.position.z)
    gltf.scene.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)

    scene.add(gltf.scene)
  })
}
