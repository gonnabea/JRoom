import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three"
import { scene, camera, renderer, composer } from "../../Screen/ThreeScreens/ThreeScene"
import {
  GodRaysEffect,
  RenderPass,
  EffectPass,
  EffectComposer,
  BloomPass,
  BloomEffect,
  SelectiveBloomEffect,
} from "postprocessing"

const addLamp = (props: {
  scale: { x: number; y: number; z: number }
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
}) => {
  const loader = new GLTFLoader()
  loader.load("/models/japanese_lamp/scene.gltf", (gltf) => {
    gltf.scene.scale.set(props.scale.x, props.scale.y, props.scale.z)
    gltf.scene.position.set(props.position.x, props.position.y, props.position.z)
    gltf.scene.rotation.set(props.rotation.x, props.rotation.y, props.rotation.z)
    scene.add(gltf.scene)

    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(
      new EffectPass(
        camera,
        new BloomEffect({
          intensity: 0.3,
        })
      )
    )
    composer.addPass(new SelectiveBloomEffect())

    const effectPass = new EffectPass(
      camera,
      new BloomEffect({
        intensity: 0.3,
      })
    )
    effectPass.renderToScreen = true
    composer.addPass(effectPass)
  })
}

export default addLamp
