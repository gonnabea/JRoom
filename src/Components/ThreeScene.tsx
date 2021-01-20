import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import styled from "styled-components"
import { OrbitControls } from "three-orbitcontrols-ts"
import { GodRaysEffect, RenderPass, EffectPass, EffectComposer } from "postprocessing"
import { BackSide, CubeCamera, DoubleSide, FrontSide } from "three"
import floorImage2 from "../resources/images/floor2.jpg"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { CSG } from "three-csg-ts"
import CSS3D from "three-css3drenderer"

// 이미지 임포트
import reactLogo from "../resources/images/reactLogo.jpg"
import styledComponentsLogo from "../resources/images/styledComponents.jpg"
import netlifyLogo from "../resources/images/netlify.jpg"
import sunsetImg1 from "../resources/images/Sunset Backgrounds/sunset12.jpg"
import groundImg from "../resources/images/ground.jpg"
import { addWindow } from "./ThreeModules/Window"
import { addDirLight } from "./ThreeModules/DirectionalLight"
import { addSpotLight } from "./ThreeModules/SpotLight"
import { addLogoBox } from "./ThreeModules/LogoBox"
import { addFloor } from "./ThreeModules/Floor"
import { addRoofWindowHole } from "./ThreeModules/RoofWIndowHole"
import { addSunLight } from "./ThreeModules/SunLight"
import { FontLoder } from "./ThreeModules/FontLoader"

const Container = styled.div`
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
let geometry: THREE.BoxGeometry, material, mesh
let controls: OrbitControls
export let composer: { addPass: (arg0: any) => void; render: (arg0: number) => void }
export let floorCamera: THREE.CubeCamera
export let floorMesh: THREE.Mesh
let cssRenderer: {
  setSize: (arg0: number, arg1: number) => void
  domElement: any
  render: (arg0: THREE.Scene, arg1: THREE.PerspectiveCamera) => void
}
let cssScene: THREE.Scene
const ThreeScene = () => {
  const ThreeContainer = useRef<HTMLDivElement>(null)

  function ThreeSceneInit() {
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 21000)
    camera.position.set(0, 0, 5000)
    scene = new THREE.Scene()
    cssRenderer = new CSS3D.CSS3DRenderer()
    cssScene = new THREE.Scene()
    cssRenderer.setSize(window.innerWidth, window.innerHeight)
    cssRenderer.domElement.style.top = 0
    cssRenderer.domElement.style.position = "absolute"
    cssRenderer.domElement.style.zIndex = "5"
    ThreeContainer?.current?.appendChild(cssRenderer.domElement)

    // 건물 박스
    const buildingGeometry = new THREE.BoxGeometry(2500, 1000, 3000)
    const buildingTexture = new THREE.TextureLoader()
    const buildingMaterial = new THREE.MeshPhongMaterial({
      color: 0xc2cee9,
      specular: "blue",
      flatShading: true,
    })
    const ExhibitionRoom = new THREE.Mesh(buildingGeometry, buildingMaterial)
    ExhibitionRoom.position.set(0, 0, -2500)

    ExhibitionRoom.material.side = THREE.BackSide // mesh 내부에서도 면이 보이게 만들어 줌.

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5) // soft white light

    ambientLight.position.set(0, 6000, 0)
    scene.add(ambientLight)

    //// 프로젝트 방 (J-Flix) ////

    const project1Geo = new THREE.BoxGeometry(3000, 1000, 2000)

    const project1Mat = new THREE.MeshPhongMaterial({ specular: "orange", flatShading: true })
    const project1Mesh = new THREE.Mesh(project1Geo, project1Mat)

    ExhibitionRoom.updateMatrix()
    project1Geo.merge(buildingGeometry, ExhibitionRoom.matrix)

    const newMesh = new THREE.Mesh(project1Geo, project1Mat)
    newMesh.material.side = THREE.BackSide
    // 윗면 faces 지우기 <- 효율적인 방법 찾기
    newMesh.geometry.faces.splice(4, 2)
    scene.add(newMesh)

    // 디렉셔널 라이트 (햇빛)
    addDirLight({ x: -1000, y: 2000, z: 2000 }, { x: -500, y: 1000, z: 800 })

    // 스포트라이트 (창문 통과하는 햇빛)
    addSpotLight({ x: -900, y: 750, z: 800 }, { x: -400, y: -500, z: -100 }, Math.PI / 18)

    // 바닥

    addFloor({ width: 3000, height: 2000, x: 0, y: -490, z: 0 })

    ////

    // 지붕
    const roofShape = new THREE.Shape()
    roofShape.moveTo(0, 0)
    roofShape.lineTo(1000, 1000) // rotate로 인해 x는 높이, y는 깊이
    roofShape.lineTo(0, 2000)

    const extrudeSettings = {
      steps: 2,
      depth: 3000, // Z축: 깊이 (rotate로 인해 너비가 됨)
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 1,
    }

    const roofGeometry = new THREE.ExtrudeGeometry(roofShape, extrudeSettings)
    const roofMaterial = new THREE.MeshPhongMaterial({
      color: 0x8c989c,
      specular: "orange",
      flatShading: true,
    })
    roofMaterial.side = THREE.DoubleSide
    const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial)

    console.log(roofGeometry.faces)
    roofGeometry.faces.splice(20, 4) // 지붕의 밑면 제거

    // 창문 구멍 뚫기

    addRoofWindowHole(roofMesh)

    // GLTF 로더 //

    // 지붕에 달린 창문 (앞면 3개)

    addWindow(
      { x: -750, y: 975, z: 500 },
      { x: 400, y: 315, z: 300 },
      { x: -Math.PI / 4, y: -Math.PI, z: 0 }
    ) // Arguments: {position, scale, rotation}
    addWindow(
      { x: 0, y: 975, z: 500 },
      { x: 400, y: 315, z: 300 },
      { x: -Math.PI / 4, y: -Math.PI, z: 0 }
    )
    addWindow(
      { x: 750, y: 975, z: 500 },
      { x: 400, y: 315, z: 300 },
      { x: -Math.PI / 4, y: -Math.PI, z: 0 }
    )

    // 지붕에 달린 창문 (뒷면 1개)

    addWindow(
      { x: 0, y: 1050, z: -400 },
      { x: 500, y: 350, z: 300 },
      { x: Math.PI / 4, y: -Math.PI, z: 0 }
    )

    // 창문 밝히기
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
    // 책 모형에 붙일 텍스트 geometry

    // 프로젝트 제목
    FontLoder(
      {
        fontModelUrl: "/fonts/helvetiker_regular.typeface.json",
        text: "J-Flix",
        size: 80,
        height: 50,
        color: 0x02f6d5,
        bevelSize: 8,
      },
      { x: 100, y: 200, z: -900 }
    )

    // 제작자 이름
    FontLoder(
      {
        fontModelUrl: "/fonts/helvetiker_regular.typeface.json",
        text: "Made By.Jiwon",
        size: 35,
        height: 50,
        color: 0xffffff,
        bevelSize: 3,
      },
      { x: 100, y: 100, z: -900 }
    )

    // 기술스택 박스 만들기

    addLogoBox({ x: -500, y: 200, z: -840 }, reactLogo)
    addLogoBox({ x: -500, y: -200, z: -840 }, styledComponentsLogo)
    addLogoBox({ x: 700, y: 100, z: -840 }, netlifyLogo)

    // TV GLTF 모델 로드

    loader.load("/models/2018_flat_screen_tv/scene.gltf", (gltf) => {
      gltf.scene.scale.set(750, 750, 2000)
      gltf.scene.position.set(-1200, 0, 0)

      gltf.scene.rotateY(Math.PI / 2)
      scene.add(gltf.scene)
    })

    // 소파 모델 로드

    loader.load("/models/sofa/scene.gltf", (gltf) => {
      gltf.scene.scale.set(220, 220, 220)
      gltf.scene.position.set(0, -500, 100)

      gltf.scene.rotateY(Math.PI)

      scene.add(gltf.scene)
    })

    // 팝콘 모델 로드

    loader.load("/models/popcorn_bucket/scene.gltf", (gltf) => {
      gltf.scene.scale.set(100, 100, 100)
      gltf.scene.position.set(-1000, -500, 850)

      gltf.scene.rotateY(Math.PI)
      scene.add(gltf.scene)
    })

    // 자동차 모델 로드

    loader.load("/models/free_porsche_911_carrera_4s/scene.gltf", (gltf) => {
      gltf.scene.scale.set(300, 300, 300)
      gltf.scene.position.set(-500, -200, 3000)
      scene.add(gltf.scene)

      const carLight = new THREE.PointLight(0xffffff, 10, 2000)
      carLight.position.set(0, -200, 3000)
      const lightIndicator = new THREE.PointLightHelper(carLight, 300)
      lightIndicator.color = 0x3f83f8

      const carLight2 = new THREE.PointLight(0x119be3, 10, 2000)
      carLight2.position.set(-1000, -200, 3000)
      const lightIndicator2 = new THREE.PointLightHelper(carLight2, 300)
      lightIndicator2.color = 0x3f83f8

      const carLight3 = new THREE.PointLight(0xffffff, 10, 3000)
      carLight3.position.set(-500, -200, 4000)
      const lightIndicator3 = new THREE.PointLightHelper(carLight3, 300)
      lightIndicator3.color = 0x3f83f8

      scene.add(carLight)
      scene.add(lightIndicator)
      scene.add(carLight2)
      scene.add(lightIndicator2)
      scene.add(carLight3)
      scene.add(lightIndicator3)
    })

    // 노을 배경 박스 생성
    const materialArray = []
    const texture_ft = new THREE.TextureLoader().load(
      "https://media-exp1.licdn.com/dms/image/C511BAQE0NnIkjkotGA/company-background_10000/0/1541489744017?e=2159024400&v=beta&t=8CzJngJh5TrtF6_WFRYSlDeycAkT52hAfb4qLYGYnv8"
    )
    const texture_bk = new THREE.TextureLoader().load(
      "https://media-exp1.licdn.com/dms/image/C511BAQE0NnIkjkotGA/company-background_10000/0/1541489744017?e=2159024400&v=beta&t=8CzJngJh5TrtF6_WFRYSlDeycAkT52hAfb4qLYGYnv8"
    )
    const texture_up = new THREE.TextureLoader().load(
      "https://media-exp1.licdn.com/dms/image/C511BAQE0NnIkjkotGA/company-background_10000/0/1541489744017?e=2159024400&v=beta&t=8CzJngJh5TrtF6_WFRYSlDeycAkT52hAfb4qLYGYnv8"
    )
    const texture_dn = new THREE.TextureLoader().load(groundImg)

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }))
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }))

    const skyboxGeo = new THREE.BoxGeometry(19000, 19000, 19000)
    const skybox = new THREE.Mesh(skyboxGeo, materialArray)
    skybox.position.set(0, 8990, 0)
    materialArray.map((mat) => {
      mat.side = THREE.BackSide
    })
    scene.add(skybox)

    // 렌더러
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xffffff, 0.5)
    renderer.domElement.style.position = "absolute"
    renderer.domElement.style.top = "0"
    renderer.domElement.style.zIndex = "1"

    // Three.js에 html embed 시키기

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

    const embedWebsite = document.createElement("iframe")
    embedWebsite.src = "https://nomfilx-jiwon.netlify.app/#/"
    embedWebsite.width = "1400px"
    embedWebsite.height = "800px"

    const cssObject = new CSS3D.CSS3DObject(embedWebsite)
    cssObject.position.set(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z)
    cssObject.rotation.set(0, Math.PI / 2, 0)
    cssScene.add(cssObject)

    // TV 뒷면 가리기 위한 Div Box

    const memo = document.createElement("div")
    memo.innerHTML = "Nomflix.Jiwon"
    memo.style.width = "1400px"
    memo.style.height = "800px"
    memo.style.backgroundColor = "black"
    memo.style.color = "white"
    memo.style.fontSize = "80px"

    const memoObject = new CSS3D.CSS3DObject(memo)
    memoObject.position.set(planeMesh.position.x - 2, planeMesh.position.y, planeMesh.position.z)
    memoObject.rotation.set(0, Math.PI / 2, 0)
    cssScene.add(memoObject)

    // 갓레이이펙트

    composer = addSunLight({ x: -600, y: 200, z: 100 })
    composer = addSunLight({ x: 200, y: 200, z: 100 })
    composer = addSunLight({ x: 1000, y: 200, z: 100 })

    controls = new OrbitControls(camera, cssRenderer.domElement)

    // 마우스 휠로 줌 조절
    controls.dollyOut = function () {
      if (camera.zoom < 5) {
        camera.zoom = camera.zoom + 0.1
        camera.updateProjectionMatrix()

        console.log(camera.zoom)
      }
    }
    controls.dollyIn = function () {
      if (camera.zoom > 0.2) {
        camera.zoom = camera.zoom - 0.1
        camera.updateProjectionMatrix()

        console.log(camera.zoom)
      }
    }

    window.addEventListener("click", () => {
      console.log(camera.position)
    })

    if (ThreeContainer.current !== null) {
      ThreeContainer.current?.appendChild(renderer.domElement)
      // renderer.setAnimationLoop( animate ); <- GPU 메모리 100% 버그 유발
      animate()
    }
  }

  setInterval(() => {
    console.log(`${frameCount} fps`)
    frameCount = 0
  }, 1000)

  let frameCount = 0
  function animate() {
    frameCount += 1

    cssRenderer.render(cssScene, camera)
    composer.render(0.1)
    // floorCamera.update(renderer, scene) <- GPU 점유율 대폭 상승 유발
    requestAnimationFrame(animate)
  }

  function resize() {
    if (ThreeContainer.current) {
      cssRenderer.setSize(ThreeContainer.current?.clientWidth, ThreeContainer.current?.clientHeight)

      renderer.setSize(ThreeContainer.current?.clientWidth, ThreeContainer.current?.clientHeight)
      camera.aspect = ThreeContainer.current?.clientWidth / ThreeContainer.current?.clientHeight
      camera.updateProjectionMatrix()
    }
  }

  useEffect(() => {
    window.addEventListener("resize", resize)
    ThreeSceneInit()
    return () => {
      scene.remove.apply(scene, scene.children)
      ThreeSceneInit()
    }
  })
  return <Container ref={ThreeContainer}></Container>
}

export default ThreeScene
