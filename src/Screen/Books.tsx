import styled from "styled-components"
import Book3D from "../Components/Books/3D-Book"

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: skyblue;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/images/wood.jpg");
`

const FrontCover = styled.img`
  background-color: white;
  width: 100%;
  height: 100%;
`

const BackCover = styled.img`
  background-color: white;
  width: 100%;
  height: 100%;
`

const BookShelf = styled.img`
  width: 70%;
  height: 100%;
  position: absolute;

  height: 63px;
  margin-top: 230px;
  padding-right: 40px; // 중앙 절렬을 위함
`

const SpineTitle = styled.h2`
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
    "Open Sans", "Helvetica Neue", sans-serif;
  width: 50%;
`

const PageTitle = styled.h1`
  position: absolute;
  top: 2%;
  left: 20%;
`

const PageDescription = styled.p`
  position: absolute;
  top: 10%;
  left: 20%;
  font-size: 15px;
`

const CoreJSCover = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DeepWorkCover = styled.div`
  background-color: black;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CODECover = styled.div`
  background-color: #80b3ff;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MoneyCover = styled.div`
  background-color: #ff924a;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SevenDBCover = styled.div`
  background-color: #bdd3b9;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RedableCover = styled.div`
  background-color: #439877;
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Books: React.FC = () => {
  return (
    <Container>
      <PageTitle>3D Book Showcase</PageTitle>
      <PageDescription>
        제가 현재 관심있는 책, 읽고있는 책, 이미 읽은 책 등을 소개하는 페이지입니다.
      </PageDescription>
      <BookShelf src="images/shelf.png" />
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/core_js_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/core_js_back.jpg"></BackCover>}
        spine={
          <CoreJSCover>
            <SpineTitle>코어 자바스크립트</SpineTitle>
          </CoreJSCover>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/seven_db_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/seven_db_back.jpg"></BackCover>}
        spine={
          <SevenDBCover>
            <SpineTitle>세븐 데이터베이스</SpineTitle>
          </SevenDBCover>
        }
      />{" "}
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/deepwork_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/deepwork_back.jpg"></BackCover>}
        spine={
          <DeepWorkCover>
            <SpineTitle>Deep Work</SpineTitle>
          </DeepWorkCover>
        }
      />{" "}
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/money_history_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/money_history_back.jpg"></BackCover>}
        spine={
          <MoneyCover>
            <SpineTitle>돈의 역사</SpineTitle>
          </MoneyCover>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/readable_code_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/readable_code_back.jpg"></BackCover>}
        spine={
          <RedableCover>
            <SpineTitle>읽기 좋은 코드가 좋은 코드다</SpineTitle>
          </RedableCover>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        spineWidth="45px"
        front={<FrontCover src="/book_covers/code_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/code_back.jpg"></BackCover>}
        spine={
          <CODECover>
            <SpineTitle>CODE</SpineTitle>
          </CODECover>
        }
      />
    </Container>
  )
}

export default Books
