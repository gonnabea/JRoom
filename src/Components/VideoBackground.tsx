import React from "react"
import styled from "styled-components"

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  z-index: -1;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
`

interface IProps {
  videoSrc: string
} 

const VideoBackground:React.FC<IProps> = ({ videoSrc }) => (
  <Container>
      <Video src={videoSrc} onContextMenu={(e) => e.preventDefault()} autoPlay muted loop></Video>
    </Container>
);

export default VideoBackground
