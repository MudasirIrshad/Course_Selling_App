import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Appbar from "./components/Appbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PurchasedCourses from "./components/PurchasedCourses";
import ViewAllCourses from "./components/ViewAllCourses.Admin";
import AddCourse from "./components/AddCourse.Admin";
export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/purchasedCourses" element={<PurchasedCourses />} />
          <Route path="/viewAllCourses" element={<ViewAllCourses />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
