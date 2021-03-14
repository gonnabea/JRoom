import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import AboutMe from "./Screen/AboutMe"
import Books from "./Screen/Books"
import Contact from "./Screen/Contact"
import Game3d from "./Screen/Documents/3d-game"
import Android from "./Screen/Documents/Android"
import Backend from "./Screen/Documents/Backend"
import CommonWiki from "./Screen/Documents/CommonWiki"
import ComputerVision from "./Screen/Documents/Computer-Vision"
import Frontend from "./Screen/Documents/Frontend"
import Wikimain from "./Screen/Documents/Main"
import Network from "./Screen/Documents/Network"
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

        {/* 위키백과 라우팅 */}
        <Route exact path="/documents" component={Wikimain}></Route>
        <Route exact path="/documents/front-end" component={Frontend}></Route>
        <Route exact path="/documents/back-end" component={Backend}></Route>
        <Route exact path="/documents/network" component={Network}></Route>
        <Route exact path="/documents/computer-vision" component={ComputerVision}></Route>
        <Route exact path="/documents/3d-game" component={Game3d}></Route>
        <Route exact path="/documents/android" component={Android}></Route>
        <Route exact path="/documents/common" component={CommonWiki}></Route>

        <Route path="/tech-stack" component={TechStack}></Route>
        <Route path="/books" component={Books}></Route>
        <Route path="/contact" component={Contact}></Route>
      </Switch>
    </Router>
  )
}
