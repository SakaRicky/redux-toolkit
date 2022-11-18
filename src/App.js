import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TopicApp from "./features/apps/topic";
import Navbar from "./components/layout/Navbar";

function App() {

  return (
    <>
      <Navbar />
      <div className="container mt-12">
        <Routes>
          <Route path="/" element={<TopicApp/>} />
          <Route path="/topics" element={<TopicApp/>} />
        </Routes>
      </div>
      </>
  );
}

export default App;
