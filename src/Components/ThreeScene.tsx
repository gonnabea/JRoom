import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import styled from "styled-components"
import { OrbitControls } from 'three-orbitcontrols-ts';

const Container = styled.div`
    
`

let camera: THREE.Camera, scene: THREE.Object3D, renderer: THREE.WebGLRenderer;
let geometry, material;
let controls: OrbitControls;

const ThreeScene = () => {
    const ThreeContainer = useRef<HTMLDivElement>(null)
    
    function ThreeSceneInit() {
    
        
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000)
        camera.position.set(0, 0, -2000)
        scene = new THREE.Scene()
    
        // 건물 박스
        geometry = new THREE.BoxGeometry(800,1000,1000)
        material = new THREE.MeshStandardMaterial({color: 0xC2BC35,metalness: 0, roughness: 0.5})
        const ExhibitionRoom = new THREE.Mesh(geometry, material)
        // mesh 내부에서도 면이 보이게 만들어 줌.
        ExhibitionRoom.material.side = THREE.BackSide
        scene.add( ExhibitionRoom );

        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        scene.add(light)

        const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.castShadow = true
        directionalLight.position.set(-350, 1100, 500)
        scene.add( directionalLight );
    
    
        renderer = new THREE.WebGLRenderer({antialias: true})
        renderer.shadowMap.enabled = true
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor('#000000')

        
        controls = new OrbitControls(camera, renderer.domElement)
        
        // 마우스 휠로 줌 조절
        const { position } = camera
        controls.dollyOut = function(){
            
            camera.position.setZ(position.z+100)
        }
        controls.dollyIn = function(){
            camera.position.setZ(position.z-100)

        }
        window.addEventListener("click", () => {
            console.log(camera.position)})
        
       
        if(ThreeContainer.current !== null){
            ThreeContainer.current.appendChild(renderer.domElement)
        }
        animate()
        
        renderer.setAnimationLoop( animate );
}

function animate() {
    requestAnimationFrame( animate )
    renderer.render(scene, camera)
    
}

    useEffect(() => {
        ThreeSceneInit()
    }, [])
    return <Container ref={ThreeContainer}>
        
    </Container>
    
}

export default ThreeScene;