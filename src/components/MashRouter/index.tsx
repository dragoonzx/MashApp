import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MashHome from "../../views/MashHome";
import MashExplore from "../../views/MashExplore";
import MashEdit from "../../views/MashEdit";

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
          <Route path="/explore" element={<MashExplore />} />
          <Route path="/edit" element={<MashEdit />} />
          <Route path="/" element={<MashHome/>} />
        </Routes>
    </Router>
  );
}