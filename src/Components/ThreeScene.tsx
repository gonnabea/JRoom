import React, { useEffect, useRef } from "react"
import * as THREE from "three"
import styled from "styled-components"
import { OrbitControls } from 'three-orbitcontrols-ts';
const Container = styled.div`
    
`

let camera: THREE.PerspectiveCamera, scene: THREE.Object3D, renderer: THREE.WebGLRenderer;
let geometry, material, mesh;
let controls: OrbitControls;
const ThreeScene = () => {
    const ThreeContainer = useRef<HTMLDivElement>(null)
    
    function ThreeSceneInit() {
    
        
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000)
        camera.position.set(800, 1000, 2000)
        scene = new THREE.Scene()

        // 배경 박스
        geometry = new THREE.BoxGeometry(10000,10000,10000)

        const bgTexture = new THREE.TextureLoader().load("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASYAAACsCAMAAADhRvHiAAAAQlBMVEX////8/Pz4+Pj09PTx8fH29vb///3p6en///v49/r98rz9/Prq5uHz8OyxsbHt7PDi5uv37vL1+vz9/+zV1Nf7+OH4MhMRAAAC20lEQVR4nO3d3VrbMAyAYZyWjg4YDOj93+pONiDLn53Ilix97wEP0KepLNtymibp3V1gP9cfTm2iMOlb2y96UYRG3jNcHh8XHjE+e4cfQhvKa+fTs9DLNTb80o6gD8ZHOwz3kN3IvrxoB7BFPol7tngVjwJwo4dKV8RdgwAUMVoDjoZltFlmkB8A8EqowveyUPQSp5hwDd5nI01kUdq9g5QmPj3NMbwWPsHB0Gjh1Pj1dLuFQVGAZAHKmITFfmsHgF6ozq4qLz7U2Kg/Jbk/BazBtZscMKWtpPvdT30TDKOBpDSK3qaHbGZyHn6IzxzYKs5J68MTJmRnKYVe7bMbr1UnsGHaL417qteBkSa/wCu6GDJYB7EpLfyONUwtTDAmEEjAgxEPD9oRAEAA7E5pqJP1RG/GZbXrrcYFiEpn7QjqYRIjJkZ+RSQ3BKl7nX5Jnz8gy8aNDPU3nbn9KhHEPgNxovOPgeWrHzBif4IUR1j2BPsJsMDzEYqaZpfjykNOpKuYFsB/huxZEbpcnk1eJRa6S3BM7sTn7TcWWD0WsRaWyZDtBcWs74K9gSPEbcNWRGxzhwRL479NWV1Ij5hrksNmKuk0k+xWZOq0f0sEaOIq5kIZ8gWgGIXDmOgrP7CAqYEC/u4unmP/7YedEMm8/1Ij2cKBvcgcG6ek2D5jZW28ND0BqOVY818GRJAmABZZq03W4lFnKCGGQgEArLrw9d053rUDqEfqonm+CD7LtdY+UuFpnuyq5SFPWQTTRMabWCzX0fM/bv+zUhTfGLg8eGZMjP+1ufjnXwt+xO7vOpaJrnArap/67XlhvbIQrSA5vGDHYZME8Kn/LpejN8zQXlDbTAYO7WyiKu3TSd5YdbIUZslrUk22K63+ib/GeeGuvhhh2igi+eFca7318LVH9+GjNbebdgS2LPRqxSz1OI4WpvJC5RBvYY8pA5DrpH2YV0DdKlXhbTJlVdAfcqQC5niL5u4AAAAASUVORK5CYII=")

        material = new THREE.MeshStandardMaterial({map:bgTexture})
        mesh = new THREE.Mesh(geometry,material) 
        mesh.material.side = THREE.DoubleSide
        scene.add(mesh)

        // 건물 박스
        const buildingGeometry = new THREE.BoxGeometry(800,1000,3000)
        const buildingTexture = new THREE.TextureLoader().load("https://lh3.googleusercontent.com/proxy/jSBBYwTXajXhEXIsTCXe0QL5m7RwjOcil4PSqckTNvoK8CIX-mfIBXMkv2xR1UnFfALnGHLeeKVvDyYhxvUy6OaQQDYqo15XXgaj8q6xqqGSwpeDiA6JfywQErU4yZljRKzPshlAjD4jWOmc8SfHF5i_7vc3OzP0RLOBPNg0")
        const buildingMaterial = new THREE.MeshPhongMaterial({map:buildingTexture})

        const ExhibitionRoom = new THREE.Mesh(buildingGeometry, buildingMaterial)
        ExhibitionRoom.position.set(0,0,0)
        
        // mesh 내부에서도 면이 보이게 만들어 줌.
        ExhibitionRoom.material.side = THREE.BackSide
        scene.add( ExhibitionRoom );

        const light = new THREE.AmbientLight( 0xffffff, 10000 ); // soft white light
        light.position.set(0,5000,0)
        scene.add(light)

        const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x1F1E1F)
        hemiLight.position.set(0,0,0 )
        scene.add(hemiLight)

        // const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        // scene.add( light );

        const dirLight = new THREE.DirectionalLight( 0xEFD740, 100 );
        dirLight.position.set(10000,10000,0 );
        dirLight.target.position.set(1000,1000,1000)
        const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 300 );
        scene.add( dirLight );
        scene.add( dirLightHelper );
       
                
        
        // const spotLight_distance = 0; // 빛의 최대범위
        // const spotLight_angle = Math.PI / 20;
        // const spotLight_penumbra = 0.5;
        // const spotLight_decay = 1.0
        // const spotLight = new THREE.SpotLight(0x1DA8F5, 1, spotLight_distance, spotLight_angle)
        // spotLight.position.set(-400,3000,0)
        

        

        // scene.add( spotLight );
    
        renderer = new THREE.WebGLRenderer({antialias: true})
        renderer.shadowMap.enabled = true
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor('#000000')



        
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
       
    },[])
    return <Container ref={ThreeContainer}>
        
    </Container>
    
}

export default ThreeScene;