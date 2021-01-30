import groundImg from "../../resources/images/ground.jpg"
import { scene } from "../ThreeScene"
import * as THREE from "three"

// 노을 배경 박스 생성

export const addBackgroundBox = () => {
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
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn })) // 땅 텍스쳐
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }))
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }))

  const skyboxGeo = new THREE.BoxGeometry(9000, 19000, 19000)
  const skybox = new THREE.Mesh(skyboxGeo, materialArray)
  skybox.position.set(0, 8990, 0)
  materialArray.map((mat) => {
    mat.side = THREE.BackSide
    return null
  })
  scene.add(skybox)
}
