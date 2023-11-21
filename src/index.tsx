import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Ghostlist from "./Ghostlist";
import {
  initAmplitude,
  identifyAmplitude,
  trackAmplitude,
} from "./utilities/amplitude";

import LandingPage from "./LandingPage";
import MintPage from "./MintPage";
import MintExperience from "./MintExperience";
import CreateOrDie from "./Collective";
import Collective from "./Collective";
import RedirectCreate from "./RedirectCreate";
import Redirect from "./Redirect";

initAmplitude();
identifyAmplitude();

trackAmplitude("Website Loaded");

const routing = (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/ghostlist" element={<Ghostlist />} />
      <Route path="/lp" element={<LandingPage />} />
      <Route path="/mint" element={<MintPage />} />
      <Route path="/createordie" element={<Collective/>}/>
      <Route path="/creatordie" element={<RedirectCreate/>}/>
      <Route path="/*" element={<Redirect/>}/>
    </Routes>
  </Router>
);

/*the code below reads the path and renders component on a conditional basis.
i.e. /home throws two different components at different places...*/
ReactDOM.render(routing, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
