import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { scene } from "../../Screen/ThreeScreens/ThreeScene"

// 액자 모델
const loader = new GLTFLoader()

export const addFrame = (props: {
  imageUrl: string
  position: { x: number; y: number; z: number }
  rotateY: number
}) => {
  loader.load("/models/3d_architecture__photo_frame/scene.gltf", (gltf) => {
    const frameGroupMesh = gltf.scene
    frameGroupMesh.scale.set(10, 10, 10)
    frameGroupMesh.position.set(props.position.x, props.position.y, props.position.z)
    frameGroupMesh.rotateY(props.rotateY)

    scene.add(frameGroupMesh)

    // 액자에 들어갈 그림

    const sizeCheckBox = new THREE.Box3().setFromObject(gltf.scene) // 액자 크기 측정을 위한 가상 박스

    const frameWidth = sizeCheckBox.max.z - sizeCheckBox.min.z - 100
    const frameHeight = sizeCheckBox.max.y - sizeCheckBox.min.y - 100
    const frameDepth = sizeCheckBox.max.x - sizeCheckBox.min.x

    const imageInFrameGeo = new THREE.PlaneBufferGeometry(frameWidth, frameHeight, frameDepth)
    const imageInFrameTexture = new THREE.TextureLoader().load(props.imageUrl)
    const imageInFrameMat = new THREE.MeshPhongMaterial({ map: imageInFrameTexture })
    const imageInFrame = new THREE.Mesh(imageInFrameGeo, imageInFrameMat)

    const pointLight = new THREE.PointLight(0xffffff, 5, 500)
    // 액자의 회전에 따른 이미지 위치 조정
    if (props.rotateY === Math.PI || props.rotateY === -Math.PI) {
      imageInFrame.position.set(props.position.x - 20, props.position.y, props.position.z)
      // 액자 회전에 따른 이미지 회전
      imageInFrame.rotateY(props.rotateY / 2)
      pointLight.position.set(props.position.x - 60, props.position.y, props.position.z)
    } else if (props.rotateY === 0) {
      imageInFrame.position.set(props.position.x + 20, props.position.y, props.position.z)
      imageInFrame.rotateY(Math.PI / 2)
      pointLight.position.set(props.position.x + 60, props.position.y, props.position.z)
    }

    const lightHelper = new THREE.PointLightHelper(pointLight, 0xffff00)
    scene.add(imageInFrame)
    scene.add(pointLight)
    // scene.add(lightHelper)
  })
}
