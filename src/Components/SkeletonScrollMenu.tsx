import React from "react"
import styled from "styled-components"


const Container = styled.div`
    width: 80vw;
    height: 90vh; 
    position: absolute;
    z-index: 1;
    top: 10%;
    right: 0%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
`

const TextArea = styled.div`
    color: black;
    font-size: 150px;
    height: 20%;
      /* Prefix required. Even Firefox only supports the -webkit- prefix */
    font-family: fantasy;
    -webkit-text-stroke: 4px white;
    -webkit-text-fill-color: transparent;
    transition: -webkit-text-fill-color 0.5s;

    :hover{
        -webkit-text-fill-color: white;
        cursor: pointer;
        ::before{
            content: "📌"
        }
    }
`

interface IProps {
    texts:Array<string>
}

const handleTexts:Function = (texts:Array<string>) => {
    return texts.map( (text:string, index) => <TextArea>
        {text}
        </TextArea>
        )
}

const SkeletonScrollMenu:React.FC<IProps> = ({texts}) => <Container>
        {handleTexts(texts)}
    </Container>


export default SkeletonScrollMenu