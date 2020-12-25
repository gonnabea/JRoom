import GlobalStyles from "./Components/GlobalStyles";
import { GlobalRouter } from "./routes";
import Home from "./Screen/Home";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <GlobalRouter />
    </div>
  );
}

export default App;
