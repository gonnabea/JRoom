import {BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Exhibition from "./Screen/Exhibition"
import Home from "./Screen/Home"

export const GlobalRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/about-me"></Route>
        <Route path="/exhibition" component={Exhibition}></Route>
      </Switch>
    </Router>
  )
}
