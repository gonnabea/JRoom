import styled from "styled-components"
import ThreeScene  from "../Components/ThreeScene"

const Container = styled.section`
width: 100vw;
height: 100vh;
overflow: auto;
display: flex;
justify-content: center;
align-items: center;
background-color: white;
opacity: 1;
cursor: grab;
cursor: -moz-grab;
cursor: -webkit-grab;
`


const Exhibition:React.FC = () => {

return <ThreeScene/>
}

export default Exhibition