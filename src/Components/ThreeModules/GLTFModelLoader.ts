import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { loadingManager, scene } from "../../Screen/ThreeScreens/ThreeScene"

export const GLTFModelLoader = (props: {
  modelUrl: string
  scale: { x: number; y: number; z: number }
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
}) => {
  const loader = new GLTFLoader(loadingManager)
  loader.load(props.modelUrl, (gltf) => {
    gltf.scene.scale.set(props.scale.x, props.scale.y, props.scale.z)
    gltf.scene.position.set(props.position.x, props.position.y, props.position.z)
    gltf.scene.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)

    scene.add(gltf.scene)
  })
}
