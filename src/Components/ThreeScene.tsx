import React, { Component, useEffect, useRef } from "react"
import * as THREE from "three"
import styled from "styled-components"

const Container = styled.div`
    
`

let camera: THREE.Camera, scene: THREE.Object3D, renderer: THREE.WebGLRenderer;
let geometry, material;

const ThreeScene = () => {
    const ThreeContainer = useRef<HTMLDivElement>(null)
    
    function ThreeSceneInit() {
    
        
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000)
        camera.position.z = 10;
        scene = new THREE.Scene()
    
        // 건물 박스
        geometry = new THREE.BoxGeometry()
        material = new THREE.MeshBasicMaterial({color: 0xffff00})
        const ExhibitionRoom = new THREE.Mesh(geometry, material)
        scene.add( ExhibitionRoom );

        const light = new THREE.AmbientLight( 0x404040 ); // soft white light
        scene.add(light)
    
    
        renderer = new THREE.WebGLRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor('#000000')
       
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