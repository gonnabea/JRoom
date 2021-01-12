import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import styled from "styled-components"
import { OrbitControls } from "three-orbitcontrols-ts"
import { GodRaysEffect, RenderPass, EffectPass, EffectComposer } from "postprocessing"
import {
  AmbientLight,
  BackSide,
  Color,
  CullFaceFront,
  DoubleSide,
  FlatShading,
  Shape,
  ShapePath,
} from "three"
import floorImage from "../resources/images/floor1.jpg"
import floorImage2 from "../resources/images/floor2.jpg"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { CSG } from "three-csg-ts"

const Container = styled.div`
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  :active {
    cursor: grabbing;
  }
`

let camera: THREE.PerspectiveCamera, scene: THREE.Object3D, renderer: THREE.WebGLRenderer
let geometry: THREE.BoxGeometry, material, mesh
let controls: OrbitControls
let composer: { addPass: (arg0: any) => void; render: (arg0: number) => void }

const ThreeScene = () => {
  const ThreeContainer = useRef<HTMLDivElement>(null)

  function ThreeSceneInit() {
    camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 8000)
    camera.position.set(0, 0, 5000)
    scene = new THREE.Scene()

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

    // mesh 내부에서도 면이 보이게 만들어 줌.
    ExhibitionRoom.material.side = THREE.BackSide
    // scene.add( ExhibitionRoom );
    const ambientLight = new THREE.AmbientLight(0xc2cee9, 0.7) // soft white light
    ambientLight.position.set(0, 6000, 0)
    scene.add(ambientLight)

    // 디렉셔널 라이트 (햇빛)
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.3)
    dirLight.position.set(2000, 2000, 0)
    dirLight.castShadow = true

    const targetObject = new THREE.Object3D()
    scene.add(targetObject)
    dirLight.target = targetObject
    dirLight.target.position.set(-400, 500, 1000)
    dirLight.target.updateMatrixWorld()

    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 300, 0xa0c2f9)
    dirLightHelper.update()

    scene.add(dirLight, dirLight.target)
    scene.add(dirLightHelper)

    // 스포트라이트 (창문 통과하는 햇빛)
    const spotLight_distance = 0 // 빛의 최대범위
    const spotLight_angle = Math.PI / 18
    const spotLight = new THREE.SpotLight(0xffffff, 0.9, spotLight_distance, spotLight_angle)
    spotLight.penumbra = 1
    spotLight.decay = 0.5
    // 창문 위치
    spotLight.position.set(-900, 750, 800)
    spotLight.target = targetObject
    spotLight.target.position.set(-400, -500, -100)
    spotLight.target.updateMatrixWorld()

    const spotLightHelper = new THREE.SpotLightHelper(spotLight)
    scene.add(spotLightHelper)

    scene.add(spotLight)

    //// 프로젝트 방 (Just-Read-It) ////

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

    // 바닥
    const floorGeo = new THREE.PlaneGeometry(3000, 2000) // width, height
    const floorTexture = new THREE.TextureLoader().load(floorImage2)
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
    floorTexture.repeat.set(5, 5)
    floorTexture.encoding = THREE.sRGBEncoding
    const floorMat = new THREE.MeshPhongMaterial({
      map: floorTexture,
      specular: "white",
      flatShading: true,
      shininess: 10,
    })
    const floorMesh = new THREE.Mesh(floorGeo, floorMat)
    floorMesh.receiveShadow = true
    floorMesh.rotateX(-Math.PI / 2) // -90도 로테이션
    floorMesh.position.set(0, -490, 0) // 위치 조정
    scene.add(floorMesh)

    // 메인룸 바닥
    const mainFloor = floorMesh.clone()
    mainFloor.scale.set(4 / 3, 1, 1)
    mainFloor.position.set(0, -490, -3500)
    mainFloor.rotateZ(Math.PI / 2)
    scene.add(mainFloor)

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
      console.log(gltf)
      gltf.scene.position.set(0, 1050, -400)
      gltf.scene.rotateX(Math.PI / 4)
      gltf.scene.rotateY(-Math.PI)
      gltf.scene.scale.set(500, 350, 300)
      scene.add(gltf.scene)
    })

    // 렌더러
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.shadowMap.enabled = true
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor("#ffffff")

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
    // renderer.render(scene, camera)
    composer.render(0.1)
  }

  function resize() {
    if (ThreeContainer.current) {
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
