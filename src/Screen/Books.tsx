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

const SpineCover = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SpineTitle = styled.h2``

const Books: React.FC = () => {
  return (
    <Container>
      <BookShelf src="images/shelf.png" />
      <Book3D
        width="300px"
        height="450px"
        front={<FrontCover src="/book_covers/core_js_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/core_js_back.jpg"></BackCover>}
        spine={
          <SpineCover>
            <SpineTitle>코어 자바스크립트</SpineTitle>
          </SpineCover>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        front={<FrontCover src="/book_covers/core_js_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/core_js_back.jpg"></BackCover>}
        spine={
          <SpineCover>
            <SpineTitle>코어 자바스크립트</SpineTitle>
          </SpineCover>
        }
      />{" "}
      <Book3D
        width="300px"
        height="450px"
        front={<FrontCover src="/book_covers/core_js_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/core_js_back.jpg"></BackCover>}
        spine={
          <SpineCover>
            <SpineTitle>코어 자바스크립트</SpineTitle>
          </SpineCover>
        }
      />{" "}
      <Book3D
        width="300px"
        height="450px"
        front={<FrontCover src="/book_covers/core_js_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/core_js_back.jpg"></BackCover>}
        spine={
          <SpineCover>
            <SpineTitle>코어 자바스크립트</SpineTitle>
          </SpineCover>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        front={<FrontCover src="/book_covers/core_js_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/core_js_back.jpg"></BackCover>}
        spine={
          <SpineCover>
            <SpineTitle>코어 자바스크립트</SpineTitle>
          </SpineCover>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        front={<FrontCover src="/book_covers/core_js_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/core_js_back.jpg"></BackCover>}
        spine={
          <SpineCover>
            <SpineTitle>코어 자바스크립트</SpineTitle>
          </SpineCover>
        }
      />
      <Book3D
        width="300px"
        height="450px"
        front={<FrontCover src="/book_covers/core_js_front.jpg"></FrontCover>}
        back={<BackCover src="/book_covers/core_js_back.jpg"></BackCover>}
        spine={
          <SpineCover>
            <SpineTitle>코어 자바스크립트</SpineTitle>
          </SpineCover>
        }
      />
    </Container>
  )
}

export default Books
