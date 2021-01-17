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

const Container = styled.div`
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  :active {
    cursor: grabbing;
  }
`

let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer
let geometry: THREE.BoxGeometry, material, mesh
let controls: OrbitControls
let composer: { addPass: (arg0: any) => void; render: (arg0: number) => void }
let floorCamera: THREE.CubeCamera
let floorMesh: THREE.Mesh
let cssRenderer: {
  setSize: (arg0: number, arg1: number) => void
  domElement: any
  render: (arg0: THREE.Scene, arg1: THREE.PerspectiveCamera) => void
}
let cssScene: THREE.Scene
const ThreeScene = () => {
  const ThreeContainer = useRef<HTMLDivElement>(null)

  function ThreeSceneInit() {
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 8000)
    camera.position.set(0, 0, 5000)
    scene = new THREE.Scene()
    cssRenderer = new CSS3D.CSS3DRenderer()
    cssScene = new THREE.Scene()
    cssRenderer.setSize(window.innerWidth, window.innerHeight)
    cssRenderer.domElement.style.top = 0
    cssRenderer.domElement.style.position = "absolute"
    ThreeContainer.current?.appendChild(cssRenderer.domElement)

    // 건물 박스
    const buildingGeometry = new THREE.BoxGeometry(2000, 1000, 4000)
    const buildingTexture = new THREE.TextureLoader()
    const buildingMaterial = new THREE.MeshPhongMaterial({
      color: 0xc2cee9,
      specular: "blue",
      flatShading: true,
    })
    const ExhibitionRoom = new THREE.Mesh(buildingGeometry, buildingMaterial)
    ExhibitionRoom.position.set(0, 0, -3000)

    ExhibitionRoom.material.side = THREE.BackSide // mesh 내부에서도 면이 보이게 만들어 줌.

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7) // soft white light
    ambientLight.castShadow = true
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

    const addDirLight = ([x, y, z]: Array<number>, [x1, y1, z1]: Array<number>) => {
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.3)
      dirLight.position.set(x, y, z)
      dirLight.castShadow = true

      dirLight.target.position.set(x1, y1, z1)
      dirLight.target.updateMatrixWorld()

      const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 300, 0xa0c2f9)
      dirLightHelper.update()

      scene.add(dirLight, dirLight.target)
      scene.add(dirLightHelper)
    }
    addDirLight([-1000, 2000, 2000], [-500, 1000, 800])

    // 스포트라이트 (창문 통과하는 햇빛)

    const addSpotLight = ([x, y, z]: Array<number>, [x1, y1, z1]: Array<number>, angle: number) => {
      const spotLight_distance = 0 // 빛의 최대범위
      const spotLight = new THREE.SpotLight(0xffffff, 0.9, spotLight_distance, angle)
      spotLight.penumbra = 1
      spotLight.decay = 0.5
      // 창문 위치
      spotLight.position.set(x, y, z)
      spotLight.target.position.set(x1, y1, z1)
      spotLight.target.updateMatrixWorld()

      const spotLightHelper = new THREE.SpotLightHelper(spotLight)
      scene.add(spotLightHelper)

      scene.add(spotLight)
    }

    addSpotLight([-900, 750, 800], [-400, -500, -100], Math.PI / 18)

    interface typeAddFloor {
      width: number
      height: number
      x: number
      y: number
      z: number
    }

    // 바닥
    const addFloor = ({ width, height, x, y, z }: typeAddFloor) => {
      const floorGeo = new THREE.PlaneGeometry(width, height) // width, height
      const floorTexture = new THREE.TextureLoader().load(floorImage2)
      floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
      floorTexture.repeat.set(5, 5)
      floorTexture.encoding = THREE.sRGBEncoding

      // project1 바닥 반사 효과
      const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(640, {
        format: THREE.RGBFormat,
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter,
      })

      floorCamera = new THREE.CubeCamera(500, 1500, cubeRenderTarget)
      floorCamera.position.set(0, 0, 0)
      scene.add(floorCamera)

      const sphereMaterial = new THREE.MeshPhongMaterial({
        envMap: cubeRenderTarget.texture,

        flatShading: true,
      })

      floorMesh = new THREE.Mesh(floorGeo, sphereMaterial)
      floorMesh.position.set(0, 100, 0)

      floorMesh.rotateX(-Math.PI / 2) // -90도 로테이션
      floorMesh.position.set(x, y, z) // 위치 조정
      scene.add(floorMesh)
      scene.add(floorMesh)
    }

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
    const roofWindowHole = new THREE.Mesh(
      new THREE.BoxGeometry(600, 500, 600),
      new THREE.MeshPhongMaterial()
    )
    const roofWindowHole2 = new THREE.Mesh(
      new THREE.BoxGeometry(600, 500, 600),
      new THREE.MeshPhongMaterial()
    )
    const roofWindowHole3 = new THREE.Mesh(
      new THREE.BoxGeometry(600, 500, 600),
      new THREE.MeshPhongMaterial()
    )
    const roofWindowHole4 = new THREE.Mesh(
      new THREE.BoxGeometry(600, 500, 700),
      new THREE.MeshPhongMaterial()
    )

    roofWindowHole.rotateZ(-Math.PI / 4)
    roofWindowHole2.rotateZ(-Math.PI / 4)
    roofWindowHole3.rotateZ(-Math.PI / 4)
    roofWindowHole4.rotateZ(Math.PI / 4)

    roofWindowHole.position.set(500, 1500, 750)
    roofWindowHole2.position.set(500, 1500, 1500)
    roofWindowHole3.position.set(500, 1500, 2250)
    roofWindowHole4.position.set(500, 700, 1500)

    roofMesh.updateMatrix()
    roofWindowHole.updateMatrix()
    roofWindowHole2.updateMatrix()
    roofWindowHole3.updateMatrix()
    roofWindowHole4.updateMatrix()

    // 첫번째 창문 구멍 생성
    const bspWindowHole = CSG.fromMesh(roofWindowHole)
    const bspRoof = CSG.fromMesh(roofMesh)

    const bspResult = bspRoof.subtract(bspWindowHole)

    const bspMeshResult = CSG.toMesh(bspResult, roofMesh.matrix)

    bspMeshResult.material = roofMesh.material

    bspMeshResult.geometry.faces.splice(97, 15) // face 목록 중 가장 끝의 것들만 제거하면 패인 부분을 제거할 수 있음

    // 두번째 창문 구멍 생성

    const bspWindowHole2 = CSG.fromMesh(roofWindowHole2)
    const bspRoof2 = CSG.fromMesh(bspMeshResult)

    const bspResult2 = bspRoof2.subtract(bspWindowHole2)
    const bspMeshResult2 = CSG.toMesh(bspResult2, bspMeshResult.matrix)
    bspMeshResult2.material = roofMesh.material

    bspMeshResult2.geometry.faces.splice(97, 16)

    // 세번쨰 창문 구멍 생성

    const bspWindowHole3 = CSG.fromMesh(roofWindowHole3)
    const bspRoof3 = CSG.fromMesh(bspMeshResult2)

    const bspResult3 = bspRoof3.subtract(bspWindowHole3)
    const bspMeshResult3 = CSG.toMesh(bspResult3, bspMeshResult.matrix)
    bspMeshResult3.material = roofMesh.material

    bspMeshResult3.geometry.faces.splice(97, 18)

    // 네번째 창문 구멍 생성
    const bspWindowHole4 = CSG.fromMesh(roofWindowHole4)
    const bspRoof4 = CSG.fromMesh(bspMeshResult3)

    const bspResult4 = bspRoof4.subtract(bspWindowHole4)
    const bspMeshResult4 = CSG.toMesh(bspResult4, bspMeshResult.matrix)
    bspMeshResult4.material = roofMesh.material

    console.log(bspMeshResult4.geometry.faces)
    bspMeshResult4.geometry.faces.splice(190, 15)

    bspMeshResult4.rotateZ(Math.PI / 2)
    bspMeshResult4.rotateX(Math.PI / 2)
    bspMeshResult4.position.set(-1500, 510, -1000)
    bspMeshResult4.material.side = DoubleSide

    scene.add(bspMeshResult4)

    // GLTF 로더 //

    // 지붕에 달린 창문 (앞면 3개)
    const loader = new GLTFLoader()

    loader.load("/models/window1/scene.gltf", (gltf) => {
      console.log(gltf)
      gltf.scene.position.set(-750, 975, 500)
      gltf.scene.rotateX(-Math.PI / 4)
      gltf.scene.rotateY(-Math.PI)
      gltf.scene.scale.set(400, 315, 300)
      scene.add(gltf.scene)
    })

    // 창문 밝히기
    const windowLight = new THREE.RectAreaLight(0xffffff)
    windowLight.position.set(-1000, 1300, 700)
    windowLight.intensity = 200
    windowLight.width = 500
    windowLight.height = 500
    windowLight.lookAt(-750, 975, 500)
    scene.add(windowLight)

    loader.load("/models/window1/scene.gltf", (gltf) => {
      console.log(gltf)
      gltf.scene.position.set(0, 975, 500)
      gltf.scene.rotateX(-Math.PI / 4)
      gltf.scene.rotateY(-Math.PI)
      gltf.scene.scale.set(400, 315, 300)
      scene.add(gltf.scene)
    })

    loader.load("/models/window1/scene.gltf", (gltf) => {
      console.log(gltf)
      gltf.scene.position.set(750, 975, 500)
      gltf.scene.rotateX(-Math.PI / 4)
      gltf.scene.rotateY(-Math.PI)
      gltf.scene.scale.set(400, 315, 300)
      scene.add(gltf.scene)
    })

    // 지붕에 달린 창문 (뒷면 1개)

    loader.load("/models/window1/scene.gltf", (gltf) => {
      gltf.scene.position.set(0, 1050, -400)
      gltf.scene.rotateX(Math.PI / 4)
      gltf.scene.rotateY(-Math.PI)
      gltf.scene.scale.set(500, 350, 300)
      scene.add(gltf.scene)
    })

    // 벽에 붙일 책 모형
    loader.load("/models/book/scene.gltf", (gltf) => {
      gltf.scene.scale.set(1000, 1000, 1000)
      gltf.scene.rotateX(Math.PI / 2)
      gltf.scene.position.set(-300, 0, -900)
      scene.add(gltf.scene)
    })
    const bookCoverMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(720, 1000, 40),
      new THREE.MeshPhongMaterial({ color: 0x292a2e, specular: "orange", flatShading: true })
    )
    bookCoverMesh.position.set(100, 0, -890)
    bookCoverMesh.material.side = DoubleSide
    scene.add(bookCoverMesh)
    // 책 모형에 붙일 텍스트 geometry
    const fontLoader = new THREE.FontLoader()
    // 프로젝트 제목
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", function (font) {
      const geometry = new THREE.TextGeometry("J-Flix", {
        font: font,
        size: 80,
        height: 50,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelOffset: 0,
        bevelSegments: 5,
      })
      const material = new THREE.MeshPhongMaterial({
        color: 0x02f6d5,
        specular: "orange",
        flatShading: true,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(100, 200, -900)
      scene.add(mesh)
    })
    // 제작자 이름
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", function (font) {
      const geometry = new THREE.TextGeometry("Made By.Jiwon", {
        font: font,
        size: 35,
        height: 50,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 5,
      })
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: "orange",
        flatShading: true,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(100, 100, -900)
      scene.add(mesh)
    })

    // 기술스택 박스 만들기

    const createLogoBox = (x: number, y: number, z: number, image: string) => {
      const logoBoxGeo = new THREE.BoxGeometry(300, 300, 300)
      const logoBoxTexture = new THREE.TextureLoader().load(image)
      const logoBoxMat = new THREE.MeshPhongMaterial({
        color: 0x8c989c,
        specular: "orange",
        flatShading: true,
        map: logoBoxTexture,
      })
      const logoBox = new THREE.Mesh(logoBoxGeo, logoBoxMat)
      logoBox.position.set(x, y, z)
      scene.add(logoBox)
    }

    createLogoBox(-500, 200, -840, reactLogo)
    createLogoBox(-500, -200, -840, styledComponentsLogo)
    createLogoBox(700, 100, -840, netlifyLogo)

    // Three.js에 html embed 시키기

    const geometry = new THREE.PlaneGeometry(1400, 800)
    const material = new THREE.MeshBasicMaterial({
      blending: THREE.NoBlending,
      opacity: 0.2,
      side: THREE.DoubleSide,
      color: new THREE.Color("black"),
    })
    const planeMesh = new THREE.Mesh(geometry, material)
    planeMesh.position.set(-1200, 10, 0)
    planeMesh.rotation.set(0, Math.PI / 2, 0)
    scene.add(planeMesh)

    planeMesh.castShadow = false
    planeMesh.receiveShadow = true

    const embedWebsite = document.createElement("iframe")
    embedWebsite.src = "https://nomfilx-jiwon.netlify.app/#/"
    embedWebsite.width = "1400px"
    embedWebsite.height = "800px"

    const cssObject = new CSS3D.CSS3DObject(embedWebsite)
    cssObject.position.set(planeMesh.position.x, planeMesh.position.y, planeMesh.position.z)
    cssObject.rotation.set(0, Math.PI / 2, 0)
    cssScene.add(cssObject)

    // 테스트용 cssObject 만들기

    const memo = document.createElement("div")
    memo.innerHTML = "테스트용 텍스트입니다!! .Jiwon"
    memo.style.width = "1400px"
    memo.style.height = "800px"
    memo.style.backgroundColor = "black"
    memo.style.fontSize = "50px"

    const memoObject = new CSS3D.CSS3DObject(memo)
    memoObject.position.set(planeMesh.position.x - 1, planeMesh.position.y, planeMesh.position.z)
    memoObject.rotation.set(0, Math.PI / 2, 0)
    cssScene.add(memoObject)

    // TV GLTF 모델 로드

    loader.load("/models/2018_flat_screen_tv/scene.gltf", (gltf) => {
      gltf.scene.scale.set(750, 750, 2000)
      gltf.scene.position.set(-1200, 0, 0)

      gltf.scene.rotateY(Math.PI / 2)
      scene.add(gltf.scene)
    })

    // 소퍼 모델 로드

    loader.load("/models/leather_black_sofa/scene.gltf", (gltf) => {
      gltf.scene.scale.set(300, 300, 300)
      gltf.scene.position.set(0, -600, 1050)

      gltf.scene.rotateY(-Math.PI / 2)

      scene.add(gltf.scene)
    })

    // const tvPointLight = new THREE.PointLight(0xffffff, 1, 1000)
    // tvPointLight.position.set(-1000, -300, 0)
    // const tvLightHelper = new THREE.PointLightHelper(tvPointLight, 300)
    // tvLightHelper.color = new THREE.Color(0xfffff)
    // scene.add(tvPointLight)
    // scene.add(tvLightHelper)

    // 렌더러
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })

    renderer.shadowMap.enabled = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor("#ffffff")
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // 갓레이이펙트

    const createSunLight = (x: number, y: number, z: number) => {
      const CylinderGeometry = new THREE.CylinderGeometry(3, 4, 20, 32)
      console.log(CylinderGeometry)
      CylinderGeometry.faces.splice(0, 1)
      CylinderGeometry.faces.splice(4, 1)
      CylinderGeometry.faces.splice(8, 1)
      CylinderGeometry.faces.splice(12, 1)
      CylinderGeometry.faces.splice(16, 1)
      CylinderGeometry.faces.splice(20, 1)
      CylinderGeometry.faces.splice(24, 1)
      CylinderGeometry.faces.splice(28, 1)
      CylinderGeometry.faces.splice(32, 1)
      CylinderGeometry.faces.splice(40, 1)
      CylinderGeometry.faces.splice(44, 1)
      CylinderGeometry.faces.splice(48, 1)
      CylinderGeometry.faces.splice(52, 1)

      const CylinderMaterial = new THREE.MeshBasicMaterial({
        color: 0xf2f1c7,
      })
      CylinderMaterial.transparent = true
      CylinderMaterial.opacity = 0.1
      const CylinderMesh = new THREE.Mesh(CylinderGeometry, CylinderMaterial)
      CylinderMesh.scale.set(60, 100, 90)
      CylinderMesh.position.set(x, y, z)
      CylinderGeometry.rotateZ(0)
      CylinderGeometry.rotateX(Math.PI / 6)
      CylinderGeometry.rotateY(-Math.PI / 4)

      scene.add(CylinderMesh)
      const godraysEffect = new GodRaysEffect(camera, CylinderMesh, {
        resolutionScale: 1,
        density: 0.9,
        decay: 0.9,
        weight: 0.5,
        samples: 100,
        blurriness: 5,
        opacity: 0.5,
      })

      const renderPass = new RenderPass(scene, camera)
      const effectPass = new EffectPass(camera, godraysEffect)
      effectPass.renderToScreen = true

      composer = new EffectComposer(renderer)
      composer.addPass(renderPass)
      composer.addPass(effectPass)
    }

    createSunLight(-600, 200, 100)
    createSunLight(200, 200, 100)
    createSunLight(1000, 200, 100)

    controls = new OrbitControls(camera, renderer.domElement)

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
      ThreeContainer.current.appendChild(renderer.domElement)
      // renderer.setAnimationLoop( animate ); <- GPU 메모리 100% 버그 유발
      animate()
    }
  }

  function animate() {
    requestAnimationFrame(animate)
    cssRenderer.render(cssScene, camera)
    composer.render(0.1)
    floorCamera.update(renderer, scene)
  }

  function resize() {
    if (ThreeContainer.current) {
      cssRenderer.setSize(
        ThreeContainer.current?.clientWidth / 1.01,
        ThreeContainer.current?.clientHeight / 1.01
      )

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
