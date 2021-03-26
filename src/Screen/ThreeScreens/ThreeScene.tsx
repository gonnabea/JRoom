import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import styled from "styled-components"
import { OrbitControls } from "three-orbitcontrols-ts"
import CSS3D from "three-css3drenderer"
import { addDirLight } from "../../Components/ThreeModules/DirectionalLight"
import { addSpotLight } from "../../Components/ThreeModules/SpotLight"
import { addSunLight } from "../../Components/ThreeModules/SunLight"
import { JFlixObjects } from "./JFlixObjs"
import { CSG } from "three-csg-ts"
import MainHallObjects from "./MainHallObjs"
import { JustReadItObjs } from "./JustReadItObjs"
import onObjects from "./ONObjs"
import outsideObjs from "./OutsideObjs"
import { connectorsMesh } from "../../Components/ThreeModules/CeilConnetor"
import { logoBoxesMesh } from "../../Components/ThreeModules/LogoBox"

const Container = styled.section`
  width: 100%;
  height: 100%;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  :active {
    cursor: grabbing;
  }
  position: relative;
  display: flex;
  justify-content: center;
  align-self: center;
  top: 5vh;
`

export let loadingManager: THREE.LoadingManager = new THREE.LoadingManager()
export let camera: THREE.PerspectiveCamera
export let scene: THREE.Scene
export let renderer: THREE.WebGLRenderer
export let controls: OrbitControls
export let composer: { addPass: (arg0: any) => void; render: (arg0: number) => void }
export let floorCamera: THREE.CubeCamera
export let floorMesh: THREE.Mesh
export let cssScene: THREE.Scene
export let selectBtnObjs: any[] = []
export let embedWebsite: HTMLIFrameElement

let cssRenderer: {
  setSize: (arg0: number, arg1: number) => void
  domElement: any
  render: (arg0: THREE.Scene, arg1: THREE.PerspectiveCamera) => void
}

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
    // Three.js 로딩 진행 화면
    const addLoadingScreen = () => {
      const loadingScreen = document.createElement("section")
      const progress = document.createElement("div")
      const progressBar = document.createElement("div")
      const loadingMsg = document.createElement("span")
      const loadingItem = document.createElement("em")

      loadingScreen.style.width = "100vw"
      loadingScreen.style.height = "100vh"
      loadingScreen.style.zIndex = "2"
      loadingScreen.style.opacity = "0.9"
      loadingScreen.style.backgroundColor = "black"
      loadingScreen.style.display = "flex"
      loadingScreen.style.flexDirection = "column"

      loadingScreen.style.justifyContent = "center"
      loadingScreen.style.alignItems = "center"

      progress.style.width = "60%"
      progress.style.height = "22px"
      progress.style.background = "#000"
      progress.style.border = "solid 2px white"
      progress.style.position = "absolute"

      progress.style.top = "20%"

      progressBar.style.width = "0%"
      progressBar.style.height = "20px"
      progressBar.style.background = "linear-gradient(to left, #00c3ff, #ffff1c)"
      progressBar.style.border = "none"

      loadingMsg.innerHTML = "불러오는 중..."
      loadingMsg.style.color = "white"
      loadingMsg.style.fontWeight = "700"
      loadingMsg.style.fontSize = "20px"

      loadingItem.style.color = "white"

      progress.appendChild(progressBar)
      loadingScreen.appendChild(progress)
      loadingScreen.appendChild(loadingMsg)
      loadingScreen.appendChild(loadingItem)
      ;(ThreeContainer.current as any).appendChild(loadingScreen)

      // 로딩 진행 중
      loadingManager.onProgress = function (item, loaded, total) {
        loadingItem.innerHTML = item
        progressBar.style.width = (loaded / total) * 100 + "%"
      }

      // 로딩 완료 시
      loadingManager.onLoad = function () {
        loadingMsg.innerHTML = "로딩 완료!"
        loadingItem.innerHTML = "마우스 휠, 드래그로 조작하세요."
        setTimeout(() => {
          loadingScreen.style.display = "none"
        }, 3000)
        console.log("Loading complete!")
      }
    }

    addLoadingScreen()
    if (window.matchMedia("(max-width:1280px)").matches) {
      camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 100000)
    } else {
      camera = new THREE.PerspectiveCamera(10, 1280 / 720, 1, 100000)
    }
    camera.position.set(-2773.8192101111504, 490.0248603839669, 4120.7527992239675)
    camera.zoom = 0.4
    camera.updateProjectionMatrix()
    camera.updateMatrix()
    scene = new THREE.Scene()
    cssRenderer = new CSS3D.CSS3DRenderer()
    cssScene = new THREE.Scene()
    if (window.matchMedia("(max-width:1280px)").matches) {
      cssRenderer.setSize(window.innerWidth, window.innerHeight)
    } else {
      cssRenderer.setSize(1280, 720)
    }
    cssRenderer.domElement.style.top = 0
    cssRenderer.domElement.style.position = "absolute"
    cssRenderer.domElement.style.zIndex = "1"
    ThreeContainer?.current?.appendChild(cssRenderer.domElement)

    // 메인 홀
    const buildingGeometry = new THREE.BoxGeometry(3000, 1000, 3000, 1, 1, 1)
    const buildingBuffGeometry = new THREE.BufferGeometry().fromGeometry(buildingGeometry)
    const buildingMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: "blue",
      flatShading: true,
    })
    const ExhibitionRoom = new THREE.Mesh(buildingBuffGeometry, buildingMaterial)
    ExhibitionRoom.position.set(0, 0, -2510)

    ExhibitionRoom.material.side = THREE.BackSide // mesh 내부에서만 면이 보이게 만들어 줌.

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2) // soft white light

    ambientLight.position.set(0, 0, 0)
    scene.add(ambientLight)

    //// 프로젝트 방 (J-Flix) ////

    const project1Geo = new THREE.BoxGeometry(3000, 1000, 2000, 1, 1, 1)
    const project1Mat = new THREE.MeshPhongMaterial({
      color: 0x787677,
      specular: "white",
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
      new THREE.BoxBufferGeometry(380, 1500, 100, 1, 1, 1),
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
      new THREE.BoxBufferGeometry(500, 700, 100, 1, 1, 1),
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
    console.log((bspMainRoomMesh as any).geometry.faces)
    // netlify에서 geometry.faces 프로퍼티를 인식하지 못하여 조치
    // face 목록 중 가장 끝의 것들만 제거하면 패인 부분을 제거할 수 있음
    ;(bspMainRoomMesh as any).geometry.faces.splice(180, 20)
    bspMainRoomMesh.castShadow = true
    bspMainRoomMesh.receiveShadow = true

    scene.add(bspMainRoomMesh)

    //// 프로젝트 방 (Our-Now) ////

    const project2Geo = new THREE.BoxGeometry(3000, 2000, 3000, 1, 1, 1)

    const project2buffGeo = new THREE.BufferGeometry().fromGeometry(project2Geo)
    const project2Mat = new THREE.MeshPhongMaterial({
      color: 0x344aff,
      specular: "purple",
      flatShading: true,
    })
    const project2Mesh = new THREE.Mesh(project2buffGeo, project2Mat)

    project2Mesh.position.set(3010, 500, -2490)
    project2Mesh.material.side = THREE.BackSide

    scene.add(project2Mesh)

    //// 프로젝트 방 (Just-Read-It) ////

    const project3Geo = new THREE.BoxGeometry(2900, 2000, 3000, 1, 1, 1)
    const project3BuffGeo = new THREE.BufferGeometry().fromGeometry(project3Geo)
    const project3Mat = new THREE.MeshPhongMaterial({
      color: 0xff9500,
      specular: "black",
      flatShading: true,
    })
    const project3Mesh = new THREE.Mesh(project3Geo, project3Mat)

    project3Mesh.position.set(-2960, 500, -2490)
    project3Mesh.material.side = THREE.BackSide

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
      curveSegments: 1,
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

    // 프로젝트별로 구분

    const projectsLoad = async () => {
      JFlixObjects()
      MainHallObjects()
      JustReadItObjs()
      onObjects()
      outsideObjs()
    }
    projectsLoad()
    // 이음새 mesh 모두 화면에 적용
    scene.add(connectorsMesh)

    // 로고박스 mesh 모두 화면에 적용
    scene.add(logoBoxesMesh)

    // 렌더러
    renderer = new THREE.WebGLRenderer({
      powerPreference: "high-performance",
      antialias: false,
      stencil: false,
      depth: false,
      alpha: true,
    })

    // renderer.shadowMap.enabled = true

    // renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // 성능 최적화를 위한 화면 크기별 해상도 조정
    if (window.matchMedia("(max-width: 500px)").matches) {
      // 모바일 기기 대비
      renderer.setPixelRatio(window.devicePixelRatio / 3)
    } else if (window.matchMedia("(max-width: 800px)").matches) {
      renderer.setPixelRatio(window.devicePixelRatio)
    } else if (window.matchMedia("(max-width: 1200px)")) {
      renderer.setPixelRatio(window.devicePixelRatio / 1.5)
    } else {
      renderer.setPixelRatio(window.devicePixelRatio / 2)
    }

    if (window.matchMedia("(max-width:1280px)").matches) {
      renderer.setSize(window.innerWidth, window.innerHeight)
    } else {
      renderer.setSize(1280, 720)
    }

    renderer.setClearColor(0xffffff, 1)
    renderer.domElement.style.position = "absolute"
    renderer.domElement.style.top = "0"
    renderer.domElement.style.zIndex = "0"

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
            if (camera.zoom < 0.5 && selectBtnObj.scale.x < 1.5) {
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

    // 카메라 회전시 버튼이 정면에서 보이도록 회전
    window.addEventListener("mousedown", function () {
      if (selectBtnObjs) {
        selectBtnObjs.map((selectBtnObj) => {
          selectBtnObj.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
        })
      }

      window.onmousemove = function () {
        if (selectBtnObjs) {
          selectBtnObjs.map((selectBtnObj) => {
            selectBtnObj.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
          })
        }
      }
    })

    // 모바일에서 버튼 회전
    if (window.matchMedia("(max-width: 480px)").matches) {
      setInterval(() => {
        if (selectBtnObjs) {
          selectBtnObjs.map((selectBtnObj) => {
            selectBtnObj.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z)
          })
        }
      }, 100)
    }

    window.addEventListener("mouseup", function () {
      window.onmousemove = null
    })

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
