import { createGlobalStyle } from "styled-components"
import normalize from "styled-normalize"

const GlobalStyles = createGlobalStyle`
${normalize}
html,
  body {
    
  }

  * {
    box-sizing: border-box;
  }
`

export default GlobalStyles
