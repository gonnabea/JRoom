import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"


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
        transform: skew(0deg);
    }
    100%{
        transform: skew(-10deg);
    }
    }

    @keyframes revertIncline {
        0%{
            transform: skew(-10deg);
        }
        100%{
            transform: skew(0deg)
        }
    }

    @keyframes InclineTextsLeft {
    0%{
        transform: skew(0deg);
    }
    100%{
        transform: skew(10deg);
    }
    }

    @keyframes revertInclineLeft {
        0%{
            transform: skew(10deg);
        }
        100%{
            transform: skew(0deg)
        }
    }

`

interface IProps {
    texts:Array<string>,
    colors:Array<string>
}

const handleTexts:Function = (texts:Array<string>) => { // props 전달 안되는 문제 고쳐야함
    
    return texts.map( (text) => <TextArea className="textAreas"> 
        {text}
        </TextArea>
        )
}

// 스크롤 시 글자 기울이는 애니메이션 구현
const inclinetexts = () => {
    const textContainer = document.getElementById("textContainer")
    textContainer?.addEventListener("wheel", () => {
            if(textContainer.scrollTop > 0){
            textContainer.style.animation = ""
            const originPosition = textContainer.scrollTop + textContainer.scrollHeight
            let currentPosition

            setTimeout(() => {
                currentPosition = textContainer.scrollTop + textContainer.scrollHeight;
                
                console.log(originPosition)
                console.log(currentPosition)
                console.dir(textContainer)
                // 스크롤을 내릴 때
                if(originPosition <= currentPosition){
                    textContainer.style.animation = `inclineTexts 1s forwards`
                     setTimeout(() => {
                         textContainer.style.animation = `revertIncline 3s forwards`
                     }, 0)
                }
                // 스크롤을 올릴 때
                else if(originPosition > currentPosition){
                    textContainer.style.animation = `InclineTextsLeft 1s forwards`
                     setTimeout(() => {
                         textContainer.style.animation = `revertInclineLeft 3s forwards`
                     }, 0)
                }
              
            }, 50);
        }
        }) 
    
}

const SkeletonScrollMenu:React.FC<IProps> = ({texts, colors}) => {
    
    
    useEffect(() => {
        inclinetexts()
    }, [])

return <Container id="textContainer">
        {handleTexts(texts, colors)}
    </Container>
}

        


export default SkeletonScrollMenu