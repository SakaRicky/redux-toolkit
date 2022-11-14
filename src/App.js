import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddTopic from "./features/apps/topic/AddTopic";
import Topic from "./features/apps/topic/Topic";
import TopicsList from "./features/apps/topic/TopicsList";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              Tutorials
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<TopicsList/>} />
          <Route path="/topics" element={<TopicsList/>} />
          <Route path="/add" element={<AddTopic/>} />
          <Route path="/topics/:id" element={<Topic/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
