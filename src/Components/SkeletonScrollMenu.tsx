import React from "react"
import styled from "styled-components"

const Container = styled.div`
    width: 80vw;
    height: 20vh;
    position: absolute;
    z-index: 1;
    top: 0;
`

const TextArea = styled.div`
    color: black;
    font-size: 30px;
`

interface IProps {
    text:string
}

const SkeletonScrollMenu:React.FC<IProps> = ({text}) => <Container>
        <TextArea>
        {text}
        </TextArea>
    </Container>


export default SkeletonScrollMenu