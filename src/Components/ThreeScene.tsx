import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import styled from "styled-components"
import { OrbitControls } from "three-orbitcontrols-ts"
import { DoubleSide, FrontSide } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import CSS3D from "three-css3drenderer"

// 이미지 임포트
import { addWindow } from "./ThreeModules/Window"
import { addDirLight } from "./ThreeModules/DirectionalLight"
import { addSpotLight } from "./ThreeModules/SpotLight"

import { addRoofWindowHole } from "./ThreeModules/RoofWIndowHole"
import { addSunLight } from "./ThreeModules/SunLight"
import { JFlixObjects } from "./ThreeModules/JFlixObjects"
import { addBackgroundBox } from "./ThreeModules/BackgroundBox"
import { addFrame } from "./ThreeModules/Frame"
import { addSelectBtn } from "./ThreeModules/SelectBtn"
import { CSG } from "three-csg-ts"
import floorImage2 from "../resources/images/floor2.jpg"
import floorImage3 from "../resources/images/floor3.jpg"
import MainHallObjects from "./ThreeModules/MainHallObjects"
import { JustReadItObjs } from "./ThreeModules/JustReadItObjs"
import { addFloor } from "./ThreeModules/floor"
import onObjects from "./ThreeModules/ONObjects"

const Container = styled.section`
  width: 100%;
  height: 100%;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  :active {
    cursor: grabbing;
  }
`

export let camera: THREE.PerspectiveCamera
export let scene: THREE.Scene
export let renderer: THREE.WebGLRenderer
export let controls: OrbitControls
export let composer: { addPass: (arg0: any) => void; render: (arg0: number) => void }
export let floorCamera: THREE.CubeCamera
export let floorMesh: THREE.Mesh
let cssRenderer: {
  setSize: (arg0: number, arg1: number) => void
  domElement: any
  render: (arg0: THREE.Scene, arg1: THREE.PerspectiveCamera) => void
}
export let cssScene: THREE.Scene
export let selectBtnObjs: any[] = []
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
export let embedWebsite: HTMLIFrameElement
export let websiteObject: THREE.Object3D
let frameCount = 0
const ThreeScene = () => {
  const ThreeContainer = useRef<HTMLDivElement>(null)

  // 작동이 안되어 고칠 필요가 있음
  function resize() {
    if (ThreeContainer.current) {
      // cssRenderer.setSize(ThreeContainer.current?.clientWidth, ThreeContainer.current?.clientHeight)
      // renderer.setSize(ThreeContainer.current?.clientWidth, ThreeContainer.current?.clientHeight)
      // camera.aspect = ThreeContainer.current?.clientWidth / ThreeContainer.current?.clientHeight
      // camera.updateProjectionMatrix()
    }
  }

  useEffect(() => {
    camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 21000)
    camera.position.set(-2773.8192101111504, 490.0248603839669, 9020.7527992239675)
    camera.zoom = 0.3
    camera.updateProjectionMatrix()
    camera.updateMatrix()
    scene = new THREE.Scene()
    cssRenderer = new CSS3D.CSS3DRenderer()
    cssScene = new THREE.Scene()
    cssRenderer.setSize(window.innerWidth, window.innerHeight)
    cssRenderer.domElement.style.top = 0
    cssRenderer.domElement.style.position = "absolute"
    cssRenderer.domElement.style.zIndex = "5"
    ThreeContainer?.current?.appendChild(cssRenderer.domElement)

    // 메인 홀
    const buildingGeometry = new THREE.BoxGeometry(3000, 1000, 3000)
    const buildingTexture = new THREE.TextureLoader()
    const buildingMaterial = new THREE.MeshPhongMaterial({
      color: 0x4e61ff,
      specular: "blue",
      flatShading: true,
    })
    const ExhibitionRoom = new THREE.Mesh(buildingGeometry, buildingMaterial)
    ExhibitionRoom.position.set(0, 0, -2510)

    ExhibitionRoom.material.side = THREE.BackSide // mesh 내부에서만 면이 보이게 만들어 줌.

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2) // soft white light

    ambientLight.position.set(0, 0, 0)
    scene.add(ambientLight)

    //// 프로젝트 방 (J-Flix) ////

    const project1Geo = new THREE.BoxGeometry(3000, 1000, 2000)

    const project1Mat = new THREE.MeshPhongMaterial({
      color: 0x8af4eb,
      specular: "orange",
      flatShading: true,
    })

    ExhibitionRoom.updateMatrix()

    project1Geo.merge(buildingGeometry, ExhibitionRoom.matrix)

    const totalMesh = new THREE.Mesh(project1Geo, project1Mat)
    totalMesh.material.side = THREE.BackSide
    // netlify에서 geometry.faces 프로퍼티를 인식하지 못하여 조치
    // 윗면 faces 지우기 <- 효율적인 방법 찾기
    ;(totalMesh as any).geometry.faces.splice(4, 2)

    // J-Flix 방문 구멍내기
    const JFlixDoorHole = new THREE.Mesh(
      new THREE.BoxBufferGeometry(380, 1500, 100),
      new THREE.MeshBasicMaterial()
    )
    JFlixDoorHole.position.set(1200, -500, -1000)

    JFlixDoorHole.updateMatrix()
    totalMesh.updateMatrix()
    const bspJFlixDoorHole = CSG.fromMesh(JFlixDoorHole)
    const bspJFlixRoom = CSG.fromMesh(totalMesh)

    const bspJFlixResult = bspJFlixRoom.subtract(bspJFlixDoorHole)

    const bspJFlixMeshResult = CSG.toMesh(bspJFlixResult, totalMesh.matrix)

    bspJFlixMeshResult.material = totalMesh.material
    bspJFlixMeshResult.updateMatrix()

    // netlify에서 geometry.faces 프로퍼티를 인식하지 못하여 조치
    // face 목록 중 가장 끝의 것들만 제거하면 패인 부분을 제거할 수 있음
    ;(bspJFlixMeshResult as any).geometry.faces.splice(85, 20)

    // 메인 홀 창문 구멍내기
    const mainRoomHole = new THREE.Mesh(
      new THREE.BoxBufferGeometry(500, 700, 100),
      new THREE.MeshBasicMaterial()
    )
    mainRoomHole.position.set(0, 100, -4000)

    mainRoomHole.updateMatrix()
    const bspMainRoomHole = CSG.fromMesh(mainRoomHole)
    const bspMainRoom = CSG.fromMesh(bspJFlixMeshResult)

    const bspMainRoomResult = bspMainRoom.subtract(bspMainRoomHole)
    const bspMainRoomMesh = CSG.toMesh(bspMainRoomResult, bspJFlixMeshResult.matrix)

    bspMainRoomMesh.material = bspJFlixMeshResult.material
    bspMainRoomMesh.updateMatrix()

    // netlify에서 geometry.faces 프로퍼티를 인식하지 못하여 조치
    // face 목록 중 가장 끝의 것들만 제거하면 패인 부분을 제거할 수 있음
    ;(bspMainRoomMesh as any).geometry.faces.splice(180, 20)
    bspMainRoomMesh.castShadow = true
    bspMainRoomMesh.receiveShadow = true
    scene.add(bspMainRoomMesh)

    //// 프로젝트 방 (Our-Now) ////

    const project2Geo = new THREE.BoxGeometry(3000, 2000, 3000)

    const project2Mat = new THREE.MeshPhongMaterial({
      color: 0x344aff,
      specular: "orange",
      flatShading: true,
    })
    const project2Mesh = new THREE.Mesh(project2Geo, project2Mat)

    project2Mesh.position.set(3000, 500, -2490)
    project2Mesh.material.side = THREE.DoubleSide

    scene.add(project2Mesh)

    //// 프로젝트 방 (Just-Read-It) ////

    const project3Geo = new THREE.BoxGeometry(2900, 2000, 3000)

    const project3Mat = new THREE.MeshPhongMaterial({
      color: 0xff9500,
      specular: "orange",
      flatShading: true,
    })
    const project3Mesh = new THREE.Mesh(project3Geo, project3Mat)

    project3Mesh.position.set(-2950, 500, -2490)
    project3Mesh.material.side = THREE.DoubleSide

    scene.add(project3Mesh)

    // 디렉셔널 라이트 (햇빛)
    addDirLight({ x: -1000, y: 2000, z: 2000 }, { x: -500, y: 1000, z: 800 })

    addDirLight({ x: 0, y: 2000, z: -2000 }, { x: 0, y: 1000, z: 0 })

    // 스포트라이트 (창문 통과하는 햇빛)
    addSpotLight({ x: -900, y: 750, z: 800 }, { x: -400, y: -500, z: -100 }, Math.PI / 18)

    // main area 지붕

    const roofShape = new THREE.Shape()
    roofShape.moveTo(-4500, 1500)
    roofShape.lineTo(0, 3000) // rotate로 인해 x는 높이, y는 깊이
    roofShape.lineTo(4500, 1500)
    const extrudeSettings = {
      steps: 2,
      depth: 4000, // Z축: 깊이 (rotate로 인해 너비가 됨)
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    }

    const roofGeometry = new THREE.ExtrudeGeometry(roofShape, extrudeSettings)
    const roofMaterial = new THREE.MeshPhongMaterial({
      color: 0x24292e,
      specular: "orange",
      flatShading: true,
    })
    roofMaterial.side = THREE.DoubleSide
    const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial)
    roofMesh.position.set(0, 0, -4000)
    scene.add(roofMesh)

    // 바닥

    addFloor({ width: 3000, height: 2000, x: 0, y: -490, z: 0, imageSrc: floorImage3 }) // J-Flix 바닥

    addFloor({ width: 3000, height: 2900, x: 0, y: -490, z: -2500, imageSrc: floorImage2 }) // 메인 홀 바닥

    addFloor({ width: 3000, height: 2900, x: 3000, y: -490, z: -2500, imageSrc: floorImage3 }) // Just-Read-It 바닥

    addFloor({ width: 3000, height: 2900, x: -3000, y: -490, z: -2500, imageSrc: floorImage3 }) // Our-Now 바닥

    ////

    // GLTF 로더 //

    // 창문 빛으로 밝히기
    const windowLight = new THREE.RectAreaLight(0xffffff)
    windowLight.position.set(-1000, 1300, 700)
    windowLight.intensity = 200
    windowLight.width = 500
    windowLight.height = 500
    windowLight.lookAt(-750, 975, 500)
    scene.add(windowLight)

    // 벽에 붙일 책 모형
    const loader = new GLTFLoader()
    loader.load("/models/book/scene.gltf", (gltf) => {
      gltf.scene.scale.set(1000, 1000, 1000)
      gltf.scene.rotateX(Math.PI / 2)
      gltf.scene.position.set(-300, 0, -900)
      scene.add(gltf.scene)
    })
    const bookCoverMesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(720, 1000, 40),
      new THREE.MeshPhongMaterial({ color: 0x292a2e, specular: "orange", flatShading: true })
    )
    bookCoverMesh.position.set(100, 0, -890)
    bookCoverMesh.material.side = DoubleSide
    scene.add(bookCoverMesh)

    // 프로젝트별로 구분
    JFlixObjects()
    MainHallObjects()
    JustReadItObjs()
    onObjects()

    // // 자동차 모델 로드

    // loader.load("/models/free_porsche_911_carrera_4s/scene.gltf", (gltf) => {
    //   let wheel: THREE.Group
    //   let rotateIndex = 0
    //   loader.load("/models/sports_car_wheel/scene.gltf", (wheelGltf) => {
    //     wheelGltf.scene.scale.set(240, 240, 240)
    //     wheelGltf.scene.position.set(-750, -300, 3390)

    //     scene.add(wheelGltf.scene)
    //     wheel = wheelGltf.scene
    //   })
    //   gltf.scene.scale.set(300, 300, 300)
    //   gltf.scene.position.set(-500, -200, 3000)
    //   scene.add(gltf.scene)

    //   // 자동차 바퀴 제거: rotation 애니메이션 구현을 위해 다른 바퀴 로드 필요.
    //   gltf.scene.children[0].children[0].children[0].children[7].visible = false
    //   gltf.scene.children[0].children[0].children[0].children[20].visible = false

    //   // 자동차 컨트롤
    //   let keysPressed = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

    //   window.addEventListener("keydown", (e) => {
    //     if (e.key === "ArrowUp") {
    //       keysPressed.ArrowUp = true
    //     } else if (e.key === "ArrowDown") {
    //       keysPressed.ArrowDown = true
    //     } else if (e.key === "ArrowLeft") {
    //       keysPressed.ArrowLeft = true
    //     } else if (e.key === "ArrowRight") {
    //       keysPressed.ArrowRight = true
    //     }

    //     if (keysPressed.ArrowUp) {
    //       // 바퀴 돌리기
    //       setInterval(() => {
    //         rotateIndex += 2
    //         wheel.rotation.x = rotateIndex
    //       }, 10)
    //       const forwardSoundUrl = "/sounds/car-start.mp3"
    //       const soundEffect = document.createElement("audio")
    //       const audioSource = document.createElement("source")
    //       soundEffect.appendChild(audioSource)
    //       soundEffect.currentTime = 1
    //       audioSource.src = forwardSoundUrl
    //       soundEffect.play()
    //       setTimeout(() => soundEffect.pause(), 2000)
    //       // 가속력을 고려한 자동차의 움직임 구현
    //       gltf.scene.translateZ(60)

    //       const moveFoward = setInterval(() => {
    //         gltf.scene.translateZ(10)
    //         wheel.position.z += 17
    //       }, 100)
    //       setTimeout(() => clearInterval(moveFoward), 1000)
    //     } else if (keysPressed.ArrowDown) {
    //       gltf.scene.translateZ(-60)
    //       const moveBackward = setInterval(() => gltf.scene.translateZ(-10), 100)
    //       setTimeout(() => clearInterval(moveBackward), 1000)
    //     } else if (keysPressed.ArrowLeft) {
    //       gltf.scene.rotateY(0.2)
    //     } else if (keysPressed.ArrowRight) {
    //       gltf.scene.rotateY(-0.2)
    //     }
    //     window.addEventListener("keyup", (e) => {
    //       if (e.key === "ArrowUp") {
    //         keysPressed.ArrowUp = false
    //       } else if (e.key === "ArrowDown") {
    //         keysPressed.ArrowDown = false
    //       } else if (e.key === "ArrowLeft") {
    //         keysPressed.ArrowLeft = false
    //       } else if (e.key === "ArrowRight") {
    //         keysPressed.ArrowRight = false
    //       }
    //     })
    //   })
    // })
    // const carLight = new THREE.PointLight(0xffffff, 10, 2000)
    // carLight.position.set(0, -200, 3000)
    // const lightIndicator = new THREE.PointLightHelper(carLight, 300)
    // lightIndicator.color = 0x3f83f8

    // const carLight2 = new THREE.PointLight(0x119be3, 10, 2000)
    // carLight2.position.set(-1000, -200, 3000)
    // const lightIndicator2 = new THREE.PointLightHelper(carLight2, 300)
    // lightIndicator2.color = 0x3f83f8

    // const carLight3 = new THREE.PointLight(0xffffff, 10, 3000)
    // carLight3.position.set(-500, -200, 4000)
    // const lightIndicator3 = new THREE.PointLightHelper(carLight3, 300)
    // lightIndicator3.color = 0x3f83f8

    // scene.add(carLight)
    // scene.add(lightIndicator)
    // scene.add(carLight2)
    // scene.add(lightIndicator2)
    // scene.add(carLight3)
    // scene.add(lightIndicator3)

    // 노을 배경 박스 생성
    // addBackgroundBox()

    // 레이캐스터 (클릭이벤트)
    // 마우스 움직일 때마다 오브젝트 감지

    const onMouseMove = (event: { clientX: number; clientY: number }) => {
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      // update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera)
      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects(scene.children)

      for (let i = 0; i < intersects.length; i++) {
        // 임의로 지정해 줬던 object name으로 구별
      }
    }

    // 렌더러
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    })

    renderer.shadowMap.enabled = true

    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xffffff, 1)
    renderer.domElement.style.position = "absolute"
    renderer.domElement.style.top = "0"
    renderer.domElement.style.zIndex = "1"

    // Three.js에 html embed 시키기
    // TV 모델에 올려진 plane mesh

    // addIframeObj({
    //   siteUrl: "https://nomfilx-jiwon.netlify.app/#/",
    //   width: 1400,
    //   height: 800,
    //   position: { x: -1200, y: 10, z: 0 },
    //   rotation: { x: 0, y: Math.PI / 2, z: 0 },
    // })

    const geometry = new THREE.PlaneBufferGeometry(1400, 800)

    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.0,
      side: THREE.DoubleSide,
    })
    const planeMesh = new THREE.Mesh(geometry, material)
    planeMesh.position.set(-1200, 10, 0)
    planeMesh.rotation.set(0, Math.PI / 2, 0)
    scene.add(planeMesh)

    embedWebsite = document.createElement("iframe")
    embedWebsite.src = "https://nomfilx-jiwon.netlify.app/#/"
    embedWebsite.width = "1400px"
    embedWebsite.height = "800px"
    embedWebsite.onmouseover = () => {
      embedWebsite.style.opacity = "1"
      tvBackCover.style.opacity = "1"
    }
    embedWebsite.onmouseleave = () => {
      embedWebsite.style.opacity = "0"
      tvBackCover.style.opacity = "0"
    }

    websiteObject = new CSS3D.CSS3DObject(embedWebsite)
    websiteObject.position.set(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z)
    websiteObject.rotation.set(0, Math.PI / 2, 0)
    cssScene.add(websiteObject)

    // TV 뒷면 가리기 위한 Div Box

    const tvBackCover = document.createElement("div")

    tvBackCover.style.width = "1400px"
    tvBackCover.style.height = "800px"
    tvBackCover.style.backgroundColor = "black"
    tvBackCover.style.color = "white"
    tvBackCover.style.fontSize = "80px"

    const tvBackCoverObject = new CSS3D.CSS3DObject(tvBackCover)
    tvBackCoverObject.position.set(
      planeMesh.position.x - 3,
      planeMesh.position.y,
      planeMesh.position.z
    )
    tvBackCoverObject.rotation.set(0, Math.PI / 2, 0)
    cssScene.add(tvBackCoverObject)

    // 선택 버튼 생성

    // 거실 (로비) 포커싱
    addSelectBtn({
      text: "2",
      btnPosition: { x: 1200, y: 300, z: -1000 },
      cameraPosition: { x: 0, y: 0, z: -3000.7527992239675 },
      targetPosition: { x: 0, y: 0, z: -2000 },
      zoomIndex: 0.2,
    })

    // 자동차 로드 포커싱
    addSelectBtn({
      text: "3",
      btnPosition: { x: 0, y: 0, z: -3500 },
      cameraPosition: { x: 0, y: 0, z: -4000.7527992239675 },
      targetPosition: { x: 0, y: 0, z: -3000 },
      zoomIndex: 0.2,
    })
    // 갓레이이펙트

    composer = addSunLight({ x: -600, y: 200, z: 100 })
    composer = addSunLight({ x: 200, y: 200, z: 100 })
    composer = addSunLight({ x: 1000, y: 200, z: 100 })

    controls = new OrbitControls(camera, cssRenderer.domElement)

    // 마우스 휠로 줌 조절
    // 확대
    controls.dollyOut = function () {
      if (camera.zoom < 5) {
        camera.zoom = camera.zoom + 0.05
        camera.updateProjectionMatrix()

        // 카메라 줌에 따른 버튼 크기 조정
        if (selectBtnObjs) {
          selectBtnObjs.map((selectBtnObj) => {
            if (selectBtnObj.scale.x > 1) {
              selectBtnObj.scale.set(
                selectBtnObj.scale.x - 0.3,
                selectBtnObj.scale.y - 0.3,
                selectBtnObj.scale.z - 0.3
              )
            }
          })
        }
      }
    }
    // 축소
    controls.dollyIn = function () {
      if (camera.zoom > 0.2) {
        camera.zoom = camera.zoom - 0.05
        console.log(camera.zoom)
        // 카메라 줌에 따른 버튼 크기 조정
        if (selectBtnObjs) {
          selectBtnObjs.map((selectBtnObj) => {
            if (camera.zoom < 0.5) {
              selectBtnObj.scale.set(
                selectBtnObj.scale.x + 0.3,
                selectBtnObj.scale.y + 0.3,
                selectBtnObj.scale.z + 0.3
              )
            }
          })
        }

        camera.updateProjectionMatrix()
      }
    }

    // 카메라 회전시 버튼이 정면에서 보이도록.
    window.addEventListener("mousedown", () => {
      if (selectBtnObjs) {
        selectBtnObjs.map((selectBtnObj) => {
          selectBtnObj.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
        })
      }
    })

    window.addEventListener("mouseup", () => {
      if (selectBtnObjs) {
        selectBtnObjs.map((selectBtnObj) => {
          selectBtnObj.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
        })
      }
    })

    window.addEventListener("mousemove", onMouseMove)

    if (ThreeContainer.current !== null) {
      ThreeContainer.current?.appendChild(renderer.domElement)
      // renderer.setAnimationLoop( animate ); <- GPU 메모리 100% 버그 유발
      animate()
    }

    setInterval(() => {
      console.log(`${frameCount} fps`)
      frameCount = 0
    }, 1000)

    function animate() {
      frameCount += 1

      cssRenderer.render(cssScene, camera)
      composer.render(1)
      // floorCamera.update(renderer, scene) <- GPU 점유율 대폭 상승 유발

      requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resize)

    return () => {
      animate()
      scene.remove.apply(scene, scene.children)
    }
  }, [])
  return <Container id="container" ref={ThreeContainer}></Container>
}

export default ThreeScene
