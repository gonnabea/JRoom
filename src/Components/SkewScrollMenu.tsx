import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const TextContainer = styled.div`
  width: 80vw;
  height: 90vh;
  position: absolute;
  opacity: 0.7;
  z-index: 1;
  top: 10%;
  right: 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`

const TextArea = styled(Link)`
  color: black;
  width: 100%;
  font-size: 10.5vw;
  height: 20%;
  display: flex;
  justify-content: center;
  text-decoration: none;
  /* Prefix required. Even Firefox only supports the -webkit- prefix */
  font-family: fantasy;
  margin-bottom: 80px;
  -webkit-text-stroke: 4px white;
  -webkit-text-fill-color: transparent;
  transition: -webkit-text-fill-color 0.5s;

  :hover {
    -webkit-text-fill-color: white;
    cursor: pointer;
  }
  @keyframes inclineTexts {
    0% {
      transform: skew(0deg);
    }
    100% {
      transform: skew(-10deg);
    }
  }

  @keyframes revertIncline {
    0% {
      transform: skew(-10deg);
    }
    100% {
      transform: skew(0deg);
    }
  }

  @keyframes InclineTextsLeft {
    0% {
      transform: skew(0deg);
    }
    100% {
      transform: skew(10deg);
    }
  }

  @keyframes revertInclineLeft {
    0% {
      transform: skew(10deg);
    }
    100% {
      transform: skew(0deg);
    }
  }
`

const Video = styled.video`
  width: 50%;
  height: 50%;
  object-fit: fill;

  box-shadow: 0px 0px 200px #68b793;
`

interface IProps {
  texts: Array<string>
  colors: Array<string>
  videoList: Array<string>
  links: Array<string>
}

// 스크롤 시 글자 기울이는 애니메이션
const inclinetexts = () => {
  const textContainer = document.getElementById("textContainer")
  textContainer?.addEventListener("wheel", () => {
    if (textContainer.scrollTop > 0) {
      textContainer.style.animation = ""
      const originPosition = textContainer.scrollTop + textContainer.scrollHeight
      let currentPosition

      setTimeout(() => {
        currentPosition = textContainer.scrollTop + textContainer.scrollHeight

        // 스크롤을 내릴 때
        if (originPosition <= currentPosition) {
          textContainer.style.animation = `inclineTexts 1s forwards`
          setTimeout(() => {
            textContainer.style.animation = `revertIncline 3s forwards`
          }, 0)
        }
        // 스크롤을 올릴 때
        else if (originPosition > currentPosition) {
          textContainer.style.animation = `InclineTextsLeft 1s forwards`
          setTimeout(() => {
            textContainer.style.animation = `revertInclineLeft 3s forwards`
          }, 0)
        }
      }, 50)
    }
  })
}

const SkeletonScrollMenu: React.FC<IProps> = ({ texts, colors, videoList, links }) => {
  const [videoIndex, setvideoIndex] = useState(0) // 화면에 나오는 비디오를 선택하기 위한 index 값
  const video = useRef<HTMLVideoElement>(null)

  const handleTexts: Function = (
    texts: Array<string>,
    colors: Array<string>,
    links: Array<string>
  ) => {
    // props 전달 안되는 문제 고쳐야함

    return texts.map((text, index) => (
      <TextArea
        to={links[index]}
        onMouseOver={() => selectVideo(index, colors)}
        className="textAreas"
      >
        {text}
      </TextArea>
    ))
  }

  const selectVideo = (index: number, colors: string[]) => {
    setvideoIndex(index)

    if (video.current !== null) {
      video.current.style.boxShadow = `0px 0px 200px ${colors[index]}`
    }
  }

  useEffect(() => {
    inclinetexts()
  }, [])

  return (
    <Container>
      <TextContainer id="textContainer">{handleTexts(texts, colors, links)}</TextContainer>
      <Video
        src={videoList[videoIndex]}
        ref={video}
        onContextMenu={(e) => e.preventDefault()}
        autoPlay
        muted
        loop
      ></Video>
    </Container>
  )
}

export default SkeletonScrollMenu
