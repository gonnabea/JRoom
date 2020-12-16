import styled from "styled-components"
import VideoBackground from "./Components/VideoBackground"
import SkewScrollMenu from "./Components/SkewScrollMenu";
import { useState } from "react";

const Container = styled.section`
width: 100vw;
height: 100vh;
overflow: auto;
display: flex;
justify-content: center;
align-items: center;
background-color: black;
opacity: 0.9;
`

const Home:React.FC = () => {
    const [selectedVid, selectVideo] = useState(0) // 화면에 나오는 비디오를 선택하기 위한 index 값

return <Container>
       <VideoBackground videoList={["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"]} selectIndex={selectedVid}></VideoBackground>
      <SkewScrollMenu texts={["xxx","About Me", "Side-Projects ✨", "Documents", "Goals", "Companies", "Contact Me...","xxx"]} colors={["blue","green", "yellow", "white", "", "", "",""]}></SkewScrollMenu>
</Container>}

export default Home