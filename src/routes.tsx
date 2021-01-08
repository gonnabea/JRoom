import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Exhibition from "./Screen/Exhibition"
import Home from "./Screen/Home"
import Interested from "./Screen/Interested"

export const GlobalRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/about-me"></Route>
        <Route path="/exhibition" component={Exhibition}></Route>
        <Route path="/interested" component={Interested}></Route>
      </Switch>
    </Router>
  )
}
