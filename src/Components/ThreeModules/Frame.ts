import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { camera, scene } from "../ThreeScene"
import nomadLogo from "../../resources/images/nomadLogo.png"

// 액자 모델
const loader = new GLTFLoader()

export let frameGroupMesh: THREE.Object3D
export const addFrame = () => {
  loader.load("/models/3d_architecture__photo_frame/scene.gltf", (gltf) => {
    frameGroupMesh = gltf.scene
    frameGroupMesh.scale.set(10, 10, 10)
    frameGroupMesh.position.set(1480, 0, 0)
    frameGroupMesh.rotateY(Math.PI)

    scene.add(frameGroupMesh)

    // 카메라 시점이 액자 뒤로 갔을 때 사라지게 하는 알고리즘
    window.addEventListener("mouseup", () => {
      console.log(camera.position)
      console.log(camera.rotation)
      const meshsOfFrame =
        frameGroupMesh.children[0].children[0].children[0].children[0].children[0].children[0]
          .children

      meshsOfFrame.map((object) => {
        if (camera.rotation.z > 0.2) {
          object.visible = false
        } else {
          object.visible = true
        }
      })
    })

    // 액자에 들어갈 그림

    const sizeCheckBox = new THREE.Box3().setFromObject(gltf.scene) // 액자 크기 측정을 위한 가상 박스
    console.log(sizeCheckBox)
    const frameWidth = sizeCheckBox.max.z - sizeCheckBox.min.z - 100
    const frameHeight = sizeCheckBox.max.y - sizeCheckBox.min.y - 100
    const frameDepth = sizeCheckBox.max.x - sizeCheckBox.min.x

    const imageInFrameGeo = new THREE.PlaneBufferGeometry(frameWidth, frameHeight, frameDepth)
    const imageInFrameTexture = new THREE.TextureLoader().load(nomadLogo)
    const imageInFrameMat = new THREE.MeshPhongMaterial({ map: imageInFrameTexture })
    const imageInFrame = new THREE.Mesh(imageInFrameGeo, imageInFrameMat)
    imageInFrame.rotateY(-Math.PI / 2)
    imageInFrame.position.set(1460, 0, 0)

    scene.add(imageInFrame)
  })
}
