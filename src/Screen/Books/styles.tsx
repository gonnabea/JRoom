import styled from "styled-components"

export const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/images/wood.jpg");
`

export const FrontCover = styled.img`
  background-color: white;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
`

export const BackCover = styled.img`
  background-color: white;
  width: 100%;
  height: 100%;
`

export const BookShelf = styled.img`
  width: 70%;
  height: 100%;
  position: absolute;

  height: 63px;
  margin-top: 230px;
  padding-right: 40px; // 중앙 절렬을 위함
`

export const SpineTitle = styled.h2`
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  width: 50%;
  text-align: center;
`

export const PageTitle = styled.h1`
  position: absolute;
  top: 2%;
  left: 20%;
`

export const PageDescription = styled.p`
  position: absolute;
  top: 10%;
  left: 20%;
  font-size: 15px;
`

export const CoreJSCover = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const DeepWorkCover = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CODECover = styled.div`
  background-color: #80b3ff;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const MoneyCover = styled.div`
  background-color: #ff924a;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SevenDBCover = styled.div`
  background-color: #bdd3b9;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const RedableCover = styled.div`
  background-color: #439877;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NodeJSCover = styled.div`
  background-color: #fd6e8a;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NicoCover = styled.div`
  background-color: #80b3ff;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const BookContentBox = styled.div`
  width: 100%;
  height: 100%;
  color: black;
  backface-visibility: hidden;
  padding: 20px;
`

export const BookTitle = styled.h2`
  font-family: fantasy;
`

export const BookAuthor = styled.span`
  font-size: 13px;
  line-height: 20px;
`

export const BookContent = styled.p`
  font-size: 12px;
  line-height: 30px;
  font-weight: 300;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const OJTubeLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const OJTubeLogo = styled.img`
  width: 80%;
`
