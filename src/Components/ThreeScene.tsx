import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import styled from "styled-components"
import { OrbitControls } from 'three-orbitcontrols-ts';
import {GodRaysEffect, RenderPass, EffectPass, EffectComposer} from "postprocessing"
import { Shape, ShapePath } from "three";
import floorImage from "../resources/images/floor1.jpg"
const Container = styled.div`
cursor: grab;
cursor: -moz-grab;
cursor: -webkit-grab;
:active{
cursor: grabbing;
}
`

let camera: THREE.PerspectiveCamera, scene: THREE.Object3D, renderer: THREE.WebGLRenderer;
let geometry: THREE.BoxGeometry, material, mesh;
let controls: OrbitControls;
let composer: { addPass: (arg0: any) => void; render: (arg0: number) => void; }

const ThreeScene = () => {
    const ThreeContainer = useRef<HTMLDivElement>(null)
    
    function ThreeSceneInit() {
    
        
        camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 8000)
        camera.position.set(0, 0, 3000)
        scene = new THREE.Scene()


        // 건물 박스
        const buildingGeometry = new THREE.BoxGeometry(2000,1000,4000)
        const buildingTexture = new THREE.TextureLoader()
        const buildingMaterial = new THREE.MeshPhongMaterial()
        const ExhibitionRoom = new THREE.Mesh(buildingGeometry, buildingMaterial)
        ExhibitionRoom.position.set(0,0,-3000)

        
        
        // mesh 내부에서도 면이 보이게 만들어 줌.
        ExhibitionRoom.material.side = THREE.BackSide
        // scene.add( ExhibitionRoom );
        const light = new THREE.AmbientLight( 0xEFD740, 0.5 ); // soft white light
        light.position.set(0,5000,0)
        scene.add(light)

        // const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x1F1E1F)
        // hemiLight.position.set(0,0,0 )
        // scene.add(hemiLight)

        // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        // scene.add( light );


        // 디렉셔널 라이트 (햇빛)
        const dirLight = new THREE.DirectionalLight( 0xffffff, 0.3 );
        dirLight.position.set(2000,2000,0 );
        dirLight.castShadow = true
        
        const targetObject = new THREE.Object3D();
        scene.add(targetObject);
        dirLight.target = targetObject
        dirLight.target.position.set(-400,500,1000)
        dirLight.target.updateMatrixWorld();

        const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 300, 0xA0C2F9 );
        dirLightHelper.update()

        scene.add( dirLight, dirLight.target );
        scene.add( dirLightHelper );
       
                
        // 스포트라이트
        const spotLight_distance = 0; // 빛의 최대범위
        const spotLight_angle = Math.PI / 40;
        const spotLight_penumbra = 0.5;
        const spotLight_decay = 1.0
        const spotLight = new THREE.SpotLight(0xffffff, 0.7, spotLight_distance, spotLight_angle)
        spotLight.penumbra = 1;
        spotLight.decay = 0.5;
        spotLight.position.set(2000,2000,0 )
        spotLight.target = targetObject;
        spotLight.target.position.set(-400,-500,1000)
        spotLight.target.updateMatrixWorld();

        const spotLightHelper = new THREE.SpotLightHelper(spotLight)
        scene.add(spotLightHelper)
        
        scene.add( spotLight );

        //// 프로젝트 방 (Just-Read-It) ////

        const project1Geo = new THREE.BoxGeometry(3000,1000,2000)
        const project1Mat = new THREE.MeshPhongMaterial()
        const project1Mesh = new THREE.Mesh(project1Geo, project1Mat)
        
        ExhibitionRoom.updateMatrix()
        project1Geo.merge(buildingGeometry,ExhibitionRoom.matrix)

        const newMesh = new THREE.Mesh(project1Geo, project1Mat)
        newMesh.material.side = THREE.BackSide
        scene.add(newMesh)

        // 바닥
        const floorGeo = new THREE.PlaneGeometry(3000,2000) // width, height
        const floorTexture = new THREE.TextureLoader().load(floorImage)
        floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
        floorTexture.repeat.set( 10, 10 );
        floorTexture.encoding = THREE.sRGBEncoding;
        const floorMat = new THREE.MeshStandardMaterial({map:floorTexture})
        const floorMesh = new THREE.Mesh(floorGeo, floorMat)
        floorMesh.receiveShadow = true;
        floorMesh.rotateX(-Math.PI / 2) // -90도 로테이션
        floorMesh.position.set(0,-490,0) // 위치 조정
        scene.add(floorMesh)


        // 메인룸 바닥
        const mainFloor = floorMesh.clone()
        mainFloor.scale.set( 4/3, 1, 1 )
        mainFloor.position.set(0,-490,-3500)
        mainFloor.rotateZ(Math.PI /2)
        scene.add(mainFloor)

        ////
        
        // 렌더러
        renderer = new THREE.WebGLRenderer({antialias: true})
        renderer.shadowMap.enabled = true
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor('#ffffff')

        // 갓레이이펙트
        const CylinderGeometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
        const CylinderMaterial = new THREE.MeshBasicMaterial({
            color: 0xEBBD48
        })
        CylinderMaterial.transparent = true
        CylinderMaterial.opacity = 0.3;
        const CylinderMesh = new THREE.Mesh(CylinderGeometry, CylinderMaterial)
        CylinderMesh.scale.set(60,60,30)
        CylinderMesh.position.set(300,100,1000)
        CylinderGeometry.rotateZ(-10)
        scene.add(CylinderMesh)
        const godraysEffect = new GodRaysEffect(camera, CylinderMesh, {
            resolutionScale: 1,
            density: 0.9,
            decay: 0.9,
            weight: 0.5,
            samples: 100,
            blurriness: 5,
            opacity: 0.5
        })
        
        const renderPass = new RenderPass(scene, camera)
        const effectPass = new EffectPass(camera,godraysEffect)
        effectPass.renderToScreen = true
        
        composer = new EffectComposer(renderer)
        composer.addPass(renderPass)
        composer.addPass(effectPass)


        
        controls = new OrbitControls(camera, renderer.domElement)
        
        // 마우스 휠로 줌 조절
            controls.dollyOut = function(){
                if(camera.zoom < 5 ){
                camera.zoom = camera.zoom + 0.1
                camera.updateProjectionMatrix();
                console.log(camera.zoom)

                }
            }
            controls.dollyIn = function(){
                if(camera.zoom > 0.2){
                camera.zoom = camera.zoom - 0.1
                camera.updateProjectionMatrix();
                console.log(camera.zoom)
                }
        }
        
        window.addEventListener("click", () => {
            console.log(camera.position)})
        
       
        if(ThreeContainer.current !== null ){
            ThreeContainer.current.appendChild(renderer.domElement)
            console.log(ThreeContainer.current)
            // renderer.setAnimationLoop( animate ); <- GPU 메모리 100% 버그 유발
            animate()
        }
        
        
    }

function animate() {
    requestAnimationFrame( animate )
    // renderer.render(scene, camera)
    composer.render(0.1)
    
}

function resize() {
    if(ThreeContainer.current){
        renderer.setSize(ThreeContainer.current?.clientWidth, ThreeContainer.current?.clientHeight)
        camera.aspect = ThreeContainer.current?.clientWidth / ThreeContainer.current?.clientHeight
        camera.updateProjectionMatrix()
    }
}


    useEffect(() => {
        window.addEventListener("resize", resize)
        ThreeSceneInit()
        return () => {
            
            scene.remove.apply(scene, scene.children);
            ThreeSceneInit()
        }
    })
    return <Container ref={ThreeContainer}>
        
    </Container>
    
}

export default ThreeScene;