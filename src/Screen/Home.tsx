import { useRef } from "react"
import styled from "styled-components"
import SkewScrollMenu from "../Components/SkewScrollMenu"

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  opacity: 1;
`
const MouseEffectBox = styled.div`
  width: 100px;
  height: 100px;
  border: 4px solid orange;
  background-color: none;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: orange;
  font-weight: 700;
`

const Home: React.FC = () => {
  // 마우스 따라오는 box 이벤트 핸들링
  const containerBox = useRef<HTMLElement>(null)
  const mouseEffectBox = useRef<HTMLDivElement>(null)
  const mouseEffect = (event: MouseEvent) => {
    if (mouseEffectBox.current && containerBox.current) {
      mouseEffectBox.current.style.left = `${event.pageX}px`
      mouseEffectBox.current.style.top = `${event.pageY}px`

      setTimeout(() => {
        const previousImage: HTMLElement | null = document.getElementById("afterImage")
        if (containerBox.current && previousImage) {
          containerBox.current.removeChild(previousImage)
        }
      }, 100)

      const afterImage = document.createElement("div")
      afterImage.id = "afterImage"
      afterImage.style.width = "100px"
      afterImage.style.height = "100px"
      afterImage.style.background = "none"
      afterImage.style.position = "absolute"
      afterImage.style.color = "orange"
      afterImage.style.border = "4px solid orange"
      afterImage.style.borderRadius = "10px"
      afterImage.style.display = "flex"
      afterImage.style.justifyContent = "center"
      afterImage.style.alignItems = "center"
      afterImage.style.fontWeight = "700"

      afterImage.style.left = `${event.pageX}px`
      afterImage.style.top = `${event.pageY}px`
      afterImage.innerHTML = "Jiwon"

      containerBox.current.appendChild(afterImage)
    }
  }
  window.addEventListener("mousemove", (e) => mouseEffect(e))
  return (
    <Container ref={containerBox}>
      <MouseEffectBox ref={mouseEffectBox}>Jiwon</MouseEffectBox>
      <SkewScrollMenu
        texts={[
          "About Me",
          "3D Exhibition ✨",
          "Documents",
          "Books",
          "Tech Stack",
          "Contact Me...",
          "Github",
        ]}
        colors={["#79D0FF", "green", "white", "#C56AC8", "#FBD591", "skyblue", "purple", "gray"]}
        videoList={[
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        ]}
        links={["/about-me", "/exhibition", "", "", "/interested"]}
      ></SkewScrollMenu>
    </Container>
  )
}

export default Home
