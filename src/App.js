import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddTopic from "./features/apps/topic/AddTopic";
import Topic from "./features/apps/topic/Topic";
import TopicApp from "./features/apps/topic";

import Navbar from "./components/layout/Navbar";
import Main from "./components/Main";
import DetailCountry from "./components/DetailCountry";

import Todo from './features/apps/topic/redux/Todo';

function App() {

  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/topics" className="navbar-brand">
          React + RTK
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/topics"} className="nav-link">
              Topics
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-12">
        <Routes>
          <Route path="/" element={<TopicApp/>} />
          <Route path="/topics" element={<TopicApp/>} />
          <Route path="/add" element={<AddTopic/>} />
          <Route path="/topics/:id" element={<Topic/>} />


          <Route path="/countries" element={<Main/>} />
          <Route path="/country/:id" element={<DetailCountry />} />

          <Route path="/todo" element={<Todo />} />

        </Routes>
      </div>
      </>
  );
}

export default App;
