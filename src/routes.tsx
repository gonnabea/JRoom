import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AboutMe from "./Screen/AboutMe"
import Books from "./Screen/Books"
import Contact from "./Screen/Contact"
import Documents from "./Screen/Documents"
import Exhibition from "./Screen/Exhibition"
import Home from "./Screen/Home"
import TechStack from "./Screen/TechStack"

export const GlobalRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/about-me" component={AboutMe}></Route>
        <Route path="/exhibition" component={Exhibition}></Route>
        <Route path="/documents" component={Documents}></Route>
        <Route path="/tech-stack" component={TechStack}></Route>
        <Route path="/books" component={Books}></Route>
        <Route path="/contact" component={Contact}></Route>
      </Switch>
    </Router>
  )
}
