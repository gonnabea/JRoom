import React from "react"
import styled from "styled-components"

const Container = styled.section`
  width: 70vw;
  height: 70vh;
  z-index: -1;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: fill;
`

interface IProps {
  videoList: Array<string>,
  selectIndex: number
} 

const VideoBackground:React.FC<IProps> = ({ videoList, selectIndex = 0 }) => (
  <Container>
      <Video src={videoList[selectIndex]} onContextMenu={(e) => e.preventDefault()} autoPlay muted loop></Video>
    </Container>
);

export default VideoBackground
