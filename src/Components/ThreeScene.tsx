import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import styled from "styled-components"
import { OrbitControls } from 'three-orbitcontrols-ts';
import {GodRaysEffect, RenderPass, EffectPass, EffectComposer} from "postprocessing"
import { Shape, ShapePath } from "three";
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
    
        
        camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 5000)
        camera.position.set(0, 0, 3000)
        scene = new THREE.Scene()

        

        // 배경 박스
        geometry = new THREE.BoxGeometry(10000,10000,10000)

        const bgTexture = new THREE.TextureLoader().load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASYAAACsCAMAAADhRvHiAAAAQlBMVEX////8/Pz4+Pj09PTx8fH29vb///3p6en///v49/r98rz9/Prq5uHz8OyxsbHt7PDi5uv37vL1+vz9/+zV1Nf7+OH4MhMRAAAC20lEQVR4nO3d3VrbMAyAYZyWjg4YDOj93+pONiDLn53Ilix97wEP0KepLNtymibp3V1gP9cfTm2iMOlb2y96UYRG3jNcHh8XHjE+e4cfQhvKa+fTs9DLNTb80o6gD8ZHOwz3kN3IvrxoB7BFPol7tngVjwJwo4dKV8RdgwAUMVoDjoZltFlmkB8A8EqowveyUPQSp5hwDd5nI01kUdq9g5QmPj3NMbwWPsHB0Gjh1Pj1dLuFQVGAZAHKmITFfmsHgF6ozq4qLz7U2Kg/Jbk/BazBtZscMKWtpPvdT30TDKOBpDSK3qaHbGZyHn6IzxzYKs5J68MTJmRnKYVe7bMbr1UnsGHaL417qteBkSa/wCu6GDJYB7EpLfyONUwtTDAmEEjAgxEPD9oRAEAA7E5pqJP1RG/GZbXrrcYFiEpn7QjqYRIjJkZ+RSQ3BKl7nX5Jnz8gy8aNDPU3nbn9KhHEPgNxovOPgeWrHzBif4IUR1j2BPsJsMDzEYqaZpfjykNOpKuYFsB/huxZEbpcnk1eJRa6S3BM7sTn7TcWWD0WsRaWyZDtBcWs74K9gSPEbcNWRGxzhwRL479NWV1Ij5hrksNmKuk0k+xWZOq0f0sEaOIq5kIZ8gWgGIXDmOgrP7CAqYEC/u4unmP/7YedEMm8/1Ij2cKBvcgcG6ek2D5jZW28ND0BqOVY818GRJAmABZZq03W4lFnKCGGQgEArLrw9d053rUDqEfqonm+CD7LtdY+UuFpnuyq5SFPWQTTRMabWCzX0fM/bv+zUhTfGLg8eGZMjP+1ufjnXwt+xO7vOpaJrnArap/67XlhvbIQrSA5vGDHYZME8Kn/LpejN8zQXlDbTAYO7WyiKu3TSd5YdbIUZslrUk22K63+ib/GeeGuvhhh2igi+eFca7318LVH9+GjNbebdgS2LPRqxSz1OI4WpvJC5RBvYY8pA5DrpH2YV0DdKlXhbTJlVdAfcqQC5niL5u4AAAAASUVORK5CYII=")

        // material = new THREE.MeshStandardMaterial()
        // mesh = new THREE.Mesh(geometry,material) 
        // mesh.material.side = THREE.DoubleSide
        // scene.add(mesh)

        // 건물 박스
        const buildingGeometry = new THREE.BoxGeometry(2000,1000,4000)
        const buildingTexture = new THREE.TextureLoader()
        const buildingMaterial = new THREE.MeshPhongMaterial()

        const ExhibitionRoom = new THREE.Mesh(buildingGeometry, buildingMaterial)
        ExhibitionRoom.position.set(0,0,-3000)
        
        // mesh 내부에서도 면이 보이게 만들어 줌.
        ExhibitionRoom.material.side = THREE.BackSide
        scene.add( ExhibitionRoom );
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

        // 프로젝트 방 (Just-Read-It)

        const project1Geo = new THREE.BoxGeometry(3000,1000,2000)
        const project1Mat = new THREE.MeshPhongMaterial()
        const project1Mesh = new THREE.Mesh(project1Geo, project1Mat)
        
        ExhibitionRoom.updateMatrix()
        project1Geo.merge(buildingGeometry,ExhibitionRoom.matrix)

        const newMesh = new THREE.Mesh(project1Geo, project1Mat)
        newMesh.material.side = THREE.BackSide
        scene.add(newMesh)
        
        
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
                if(camera.zoom > 0.3){
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


    useEffect(() => {
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