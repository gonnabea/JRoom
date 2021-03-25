import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
  background-color: ${(props) => props.color};
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
  position: fixed;
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
  color: white;
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
    /* -webkit-text-fill-color: ${(props) => props.color}; */
    -webkit-text-fill-color: white;
    background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12);
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

// anchor 링크가 필요한 경우
const TextAreaAnchor = styled.a`
  color: white;
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
    /* -webkit-text-fill-color: ${(props) => props.color}; */
    -webkit-text-fill-color: white;
    /* background-image: linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12); */
    background-color: red;

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
  transform-style: preserve-3d;

  width: 95%;
  height: 95%;
  object-fit: fill;
  transform: rotateZ(-5deg);
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

const SkewScrollMenu: React.FC<IProps> = ({ texts, colors, videoList, links }) => {
  const [videoIndex, setvideoIndex] = useState(1) // 화면에 나오는 비디오를 선택하기 위한 index 값
  const background = useRef(null)
  const video = useRef<HTMLVideoElement>(null)

  const handleTexts: Function = (
    texts: Array<string>,
    colors: Array<string>,
    links: Array<string>
  ) => {
    // props 전달 안되는 문제 고쳐야함

    return texts.map((text, index) => {
      // 2번째 메뉴와 6번째 메뉴만 anchor, 나머지는 React Link
      if (index != 1 && index != 6) {
        return (
          <TextArea
            to={links[index]}
            onMouseOver={(e) => selectVideo(e, index, colors)}
            className="textAreas"
            color={colors[index]}
          >
            {text}
          </TextArea>
        )
      } else {
        return (
          <TextAreaAnchor
            href={links[index]}
            onMouseOver={(e) => selectVideo(e, index, colors)}
            className="textAreas"
            color={colors[index]}
            target="_blank"
          >
            {text}
          </TextAreaAnchor>
        )
      }
    })
  }

  const soundEffect = new Audio("/sounds/bicycle.mp3")
  const selectVideo = (e: any, index: number, colors: string[]) => {
    // 크롬 브라우저 버그로 인해 딜레이가 생겨 임시로 비활성화 처리
    // setvideoIndex(index)
    soundEffect.play()
    if (video.current !== null) {
      video.current.style.boxShadow = `0px 0px 200px ${colors[index]}`
    }

    if (background.current) {
      ;(background.current as any).style.backgroundColor = colors[index]
    }
  }

  useEffect(() => {
    inclinetexts()
  }, [])

  return (
    <Container ref={background}>
      <TextContainer id="textContainer">{handleTexts(texts, colors, links)}</TextContainer>
      <Video
        src={videoList[videoIndex]}
        ref={video}
        onContextMenu={(e) => e.preventDefault()}
        autoPlay
        loop
        muted
      ></Video>
    </Container>
  )
}

export default SkewScrollMenu
