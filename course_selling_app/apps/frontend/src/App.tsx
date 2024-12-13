import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Appbar from "./components/Appbar";
import Home from "./components/Home";
export default function App() {
  return (
    <RecoilRoot>
      <Router>
      <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
