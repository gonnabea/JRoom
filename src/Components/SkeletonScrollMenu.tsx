import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"

//스크롤 시 작동하는 글자 기울기 애니메이션


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
    width: 100%;
    font-size: 150px;
    height: 20%;
    display: flex;
    justify-content: center;
      /* Prefix required. Even Firefox only supports the -webkit- prefix */
    font-family: fantasy;
    margin-bottom: 80px;
    -webkit-text-stroke: 4px white;
    -webkit-text-fill-color: transparent;
    transition: -webkit-text-fill-color 0.5s;

    :hover{
        -webkit-text-fill-color: white;
        cursor: pointer;
        
    }
    @keyframes inclineTexts {
    0%{
        transform: rotateZ(0deg);
    }
    100%{
        transform: rotateZ(2deg);
    }
    }

    @keyframes revertIncline {
        0%{
            transform: rotateZ(2deg);
        }
        100%{
            transform: rotateZ(0deg)
        }
    }

    @keyframes InclineTextsLeft {
    0%{
        transform: rotateZ(0deg);
    }
    100%{
        transform: rotateZ(-2deg);
    }
    }

    @keyframes revertInclineLeft {
        0%{
            transform: rotateZ(-2deg);
        }
        100%{
            transform: rotateZ(0deg)
        }
    }

`

interface IProps {
    texts:Array<string>
}

const handleTexts:Function = (texts:Array<string>) => {
    return texts.map( (text:string, index) => <TextArea className="textAreas">
        {text}
        </TextArea>
        )
}

const inclinetexts = () => {
    const textContainer = document.getElementById("textContainer")
    if(textContainer){
        textContainer?.addEventListener("wheel", () => {
            const originPosition = textContainer.scrollTop
            let currentPosition

            setTimeout(() => {
                currentPosition = textContainer.scrollTop;
                
                console.log(originPosition)
                console.log(currentPosition)
                // 스크롤을 내릴 때
                if(originPosition < currentPosition){
                    textContainer.style.animation = `inclineTexts 0s forwards`
                     setTimeout(() => {
                         textContainer.style.animation = `revertIncline 2s forwards`
                     }, 0)
                }
                // 스크롤을 올릴 때
                else if(originPosition > currentPosition){
                    textContainer.style.animation = `InclineTextsLeft 0s forwards`
                     setTimeout(() => {
                         textContainer.style.animation = `revertInclineLeft 2s forwards`
                     }, 0)
                }
            }, 50);
        }) 
    }
}

const SkeletonScrollMenu:React.FC<IProps> = ({texts}) => {
    
    
    useEffect(() => {
        inclinetexts()
    }, [])

return <Container id="textContainer">
        {handleTexts(texts)}
    </Container>
}

        


export default SkeletonScrollMenu