import React from "react"
import styled from "styled-components"

const Container = styled.section`
  width: 50vw;
  height: 50vh;
  z-index: -1;
  box-shadow: 0 0 200px green;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: fill;
  opacity: 0.6;
`

interface IProps {
  videoList: Array<string>
  selectIndex: number
}

const VideoBackground: React.FC<IProps> = ({ videoList, selectIndex = 0 }) => (
  <Container>
    <Video
      src={videoList[selectIndex]}
      onContextMenu={(e) => e.preventDefault()}
      autoPlay
      muted
      loop
    ></Video>
  </Container>
)

export default VideoBackground
