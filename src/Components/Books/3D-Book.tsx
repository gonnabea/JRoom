import styled, { ThemedStyledFunction } from "styled-components"

interface props {
  width?: string
  height?: string
  spineWidth?: string
  topWidth?: string
  front?: JSX.Element
  inside?: JSX.Element
  back?: JSX.Element
  spine?: JSX.Element
  inside1?: JSX.Element
  inside2?: JSX.Element
  inside3?: JSX.Element
  inside4?: JSX.Element

  bookTitle?: string
}
// So there's currently no way in TypeScript to pass a generic type to a tagged template literal
// https://stackoverflow.com/questions/63169809/property-name-does-not-exist-on-type-themedstyledprops

const Container = styled.section`
  cursor: pointer;
  transform-style: preserve-3d;
  position: relative;
  color: white;
  animation: rotate 0.5s forwards;
  /* width: ${(props: props) => (props.width ? props.width : "!00px")}; <- 원본 코드 */
  width: ${(props: props) =>
    props.spineWidth ? props.spineWidth : "40px"}; // rotateY 90도 일 시 정렬을 위함

  height: ${(props) => (props.height ? props.height : "150px")};
  /* backface-visibility: visible; */
  transform: rotateY(90deg);

  @keyframes rotate {
    from {
      transform: rotateX(10deg) rotateY(0deg) translateX(-100px) translateY(-20%) scale(1.2);
    }
    to {
      transform: rotateY(90deg);
    }
  }
  @keyframes revert {
    from {
      transform: rotateX(10deg) rotateY(0deg) translateX(-100px) translateY(-20%);
    }
    to {
      transform: rotateY(0deg);
    }
  }
  @keyframes takeOut {
    from {
      transform: rotateY(90deg);
    }
    to {
      transform: rotateX(10deg) rotateY(0deg) translateX(-100px) translateY(-20%) scale(1.2);
    }
  }

  @keyframes incline {
    from {
      transform: rotateY(90deg);
    }
    to {
      transform: rotateY(90deg) rotateZ(-20deg) translateY(30px);
    }
  }
`

const Front = styled.div`
  transform-style: preserve-3d;
  position: absolute;
  width: ${(props: props) => (props.width ? props.width : "100px")};
  height: ${(props) => (props.height ? `calc(${props.height} + 0px)` : "150px")};
  background-color: black;
  color: white;
  transform-origin: top left;
  :hover {
    /* animation: openBook 2s forwards; */
  }
  @keyframes openBook {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(-160deg);
    }
  }
`

const Back = styled.div`
  transform-style: preserve-3d;
  position: absolute;
  width: ${(props: props) => (props.width ? props.width : "100px")};
  height: ${(props) => (props.height ? props.height : "150px")};
  background-color: black;
  transform: translateZ(
    ${(props) => (props.spineWidth ? `calc(${props.spineWidth}*-1)` : "-30px")}
  );
  top: 0;
`

const Spine = styled.div`
  transform-style: preserve-3d;
  position: absolute;
  width: calc(${(props: props) => (props.spineWidth ? props.spineWidth : "30px")});
  height: ${(props) => (props.height ? props.height : "150px")};
  background-color: grey;
  transform: rotateY(-90deg)
    translateX(${(props) => (props.spineWidth ? `calc(${props.spineWidth} /-2)` : "15px")})
    translateZ(${(props) => (props.spineWidth ? `calc(${props.spineWidth} /2)` : "15px")});
  border: solid 1px black;
`

const Top = styled.div`
  transform-style: preserve-3d;
  position: absolute;
  width: calc(${(props: props) => (props.width ? props.width : "150px")});
  height: ${(props) => (props.spineWidth ? props.spineWidth : "40px")};
  background-color: white;
  transform: rotateX(90deg)
    translateY(${(props) => (props.spineWidth ? `calc(${props.spineWidth} /-2)` : "-20px")});
  /* background-image: url("images/book_paper_top.png"); */
  border: solid 2px black;
`

const Inside1 = styled.div`
  transform-style: preserve-3d;
  transform-origin: top left;
  position: absolute;
  top: 7px;
  width: calc(${(props: props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(5px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -18)` : "-5px")});
  background-color: white;
  border-radius: 0 3px 3px 0;
  color: black;

  /* animation: flipPage 0.5s forwards; */
  @keyframes flipPage {
    to {
      transform: rotateY(-159deg);
    }
  }
`

const Inside2 = styled.div`
  transform-style: preserve-3d;
  transform-origin: top left;
  position: absolute;
  top: 7px;
  width: calc(${(props: props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(5px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -16)` : "-5px")});
  background-color: white;
  border-radius: 0 3px 3px 0;
`

const Inside3 = styled.div`
  transform-style: preserve-3d;
  transform-origin: top left;
  position: absolute;
  top: 7px;
  width: calc(${(props: props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(5px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -14)` : "-5px")});
  background-color: white;
  border-radius: 0 3px 3px 0;
`

const Inside4 = styled.div`
  transform-style: preserve-3d;
  transform-origin: top left;
  position: absolute;
  top: 7px;
  width: calc(${(props: props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(5px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -12)` : "-5px")});
  background-color: white;
  border-radius: 0 3px 3px 0;
`

const Inside5 = styled.div`
  transform-style: preserve-3d;
  position: absolute;
  top: 7px;
  width: calc(${(props: props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(5px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -10)` : "-5px")});
  background-color: white;
  border-radius: 0 3px 3px 0;
`

const Inside6 = styled.div`
  transform-style: preserve-3d;
  position: absolute;
  top: 7px;
  width: calc(${(props: props) => (props.width ? props.width : "100px")} + (-10px));
  height: calc(${(props) => (props.height ? props.height : "150px")} + (-10px));
  transform: translateX(5px)
    translateZ(${(props) => (props.width ? `calc(${props.width} / -8)` : "-5px")});
  background-color: white;
  border-radius: 0 3px 3px 0;
`

const Book3D: React.FC<props> = ({
  width = "300px",
  height = "500px",
  spineWidth = "40px",
  front,
  inside1,
  inside2,
  inside3,
  inside4,

  back,
  spine,
  bookTitle,
}) => {
  // 책 닫혔을 때 책 페이지 넘겨지는 버그 방지
  let bookState: string

  // 책 꺼내기
  const takeOutBook = (e: any) => {
    e.stopPropagation()

    e.currentTarget.style.animation = "takeOut 0.5s forwards"
    e.currentTarget.style.zIndex = 1
  }

  // 책 돌려놓기
  const revertBook = (e: any) => {
    bookState = "close"
    e.currentTarget.style.animation = null // js로 트리거되는 애니메이션을 없애서 css 애니메이션을 발동시킴
    e.currentTarget.childNodes[0].style.animation = "" // 모든 element를 원래대로

    for (let i = 0; i < e.currentTarget.childNodes.length; i++) {
      e.currentTarget.childNodes[i].style.animation = ""
      e.currentTarget.childNodes[i].style.transform = ""
    }

    // zIndex를 변경하여 자연스런 효과 유도
    setTimeout(
      (e: any) => {
        if (e) {
          e.style.zIndex = 0
        }
      },
      200,
      e.currentTarget
    )
  }

  const openBook = (e: any) => {
    console.dir(e.currentTarget)
    bookState = "open"
    e.currentTarget.style.animation = "openBook 0.5s forwards"
    e.currentTarget.style.background = null
  }

  const flipPage = (e: any) => {
    if (bookState === "open") {
      e.currentTarget.style.animation = "flipPage 0.5s forwards"
    }
  }

  const closeBook = (e: any) => {
    console.dir(e.currentTarget.parentNode)
    e.currentTarget.style.transformOrigin = "top left"
    e.currentTarget.style.transform = "rotateY(-157deg)"
  }

  return (
    <Container
      id="container"
      onClick={(e: any) => takeOutBook(e)}
      onMouseLeave={(e: any) => revertBook(e)}
      width={width}
      height={height}
      spineWidth={spineWidth}
      bookTitle={bookTitle}
    >
      <Front onClick={openBook} width={width} height={height} spineWidth={spineWidth}>
        {front}
      </Front>
      {/* <Top width={width} height={height} spineWidth={spineWidth}></Top> */}
      <Inside1
        onClick={(e: any) => flipPage(e)}
        width={width}
        height={height}
        spineWidth={spineWidth}
      >
        {inside1}
      </Inside1>
      <Inside2
        onClick={(e: any) => flipPage(e)}
        width={width}
        height={height}
        spineWidth={spineWidth}
      >
        {inside2}
      </Inside2>
      <Inside3
        onClick={(e: any) => flipPage(e)}
        width={width}
        height={height}
        spineWidth={spineWidth}
      >
        {inside3}
      </Inside3>
      {/* 책 페이지 필요 없을 경우 처리 */}
      {inside4 ? (
        <Inside4
          onClick={(e: any) => flipPage(e)}
          width={width}
          height={height}
          spineWidth={spineWidth}
        >
          {inside4}
        </Inside4>
      ) : null}

      <Back
        onClick={(e: any) => closeBook(e)}
        width={width}
        height={height}
        spineWidth={spineWidth}
      >
        {back}
      </Back>
      <Spine width={width} height={height} spineWidth={spineWidth}>
        {spine}
      </Spine>
    </Container>
  )
}

export default Book3D
