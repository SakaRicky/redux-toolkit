import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddTopic from "./features/apps/topic/AddTopic";
import Topic from "./features/apps/topic/Topic";
import TopicApp from "./features/apps/topic";

function App() {

  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/topics" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/topics"} className="nav-link">
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
          <Route path="/" element={<TopicApp/>} />
          <Route path="/topics" element={<TopicApp/>} />
          <Route path="/add" element={<AddTopic/>} />
          <Route path="/topics/:id" element={<Topic/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
