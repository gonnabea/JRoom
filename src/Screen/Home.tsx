import styled from "styled-components"
import SkewScrollMenu from "../Components/SkewScrollMenu";


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

const Home:React.FC = () => {

return <Container>
       
      <SkewScrollMenu texts={["About Me", "Exhibition ✨", "Documents", "Books", "Interested", "Contact Me...","Github"]} 
      colors={["#79D0FF","green", "white", "#C56AC8", "#FBD591", "skyblue", "purple", "gray"]}
      videoList={["http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"]} 
      links={["/about-me","/exhibition","","","/interested"]}
      ></SkewScrollMenu>
</Container>}

export default Home