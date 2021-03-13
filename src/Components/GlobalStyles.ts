import { createGlobalStyle } from "styled-components"
import normalize from "styled-normalize"

const GlobalStyles = createGlobalStyle`
${normalize}
html,
  body {
    overflow:hidden;
    background-color: white;
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyles
