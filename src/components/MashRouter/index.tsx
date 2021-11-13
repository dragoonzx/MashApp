import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MashHome from "../../views/MashHome";
import MashAbout from "../../views/MashAbout";

export default function MashRouter() {
  return (
    <Router>
        <Routes>
          {/* <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route> */}
          <Route path="/about" element={<MashAbout />} />
          <Route path="/" element={<MashHome/>} />
        </Routes>
    </Router>
  );
}