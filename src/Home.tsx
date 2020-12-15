import styled from "styled-components"
import VideoBackground from "./Components/VideoBackground"
import SkeletonScrollMenu from "./Components/SkeletonScrollMenu";

const Container = styled.section`
width: 100vw;
height: 100vh;
overflow: auto;
`

const Home:React.FC = () => <Container>
       <VideoBackground videoSrc="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"></VideoBackground>
      <SkeletonScrollMenu text={"어썸한 메뉴"}></SkeletonScrollMenu>
</Container>

export default Home