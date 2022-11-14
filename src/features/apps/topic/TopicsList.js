import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTopics,
  findTopicsByTitle,
  deleteAllTopics,
} from "./slices";
import { Link } from "react-router-dom";

const TopicsList = () => {
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const topics = useSelector(state => state.topics);
  const dispatch = useDispatch();

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const initFetch = useCallback(() => {
    dispatch(getTopics());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  const refreshData = () => {
    setCurrentTopic(null);
    setCurrentIndex(-1);
  };

  const setActiveTopic = (topic, index) => {
    setCurrentTopic(topic);
    setCurrentIndex(index);
  };

  const removeAllTopics = () => {
    dispatch(deleteAllTopics())
      .then(response => {
        refreshData();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    refreshData();
    dispatch(findTopicsByTitle({ title: searchTitle }));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Topics List</h4>

        <ul className="list-group">
          {topics &&
            topics.map((topic, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTopic(topic, index)}
                key={index}
              >
                {topic.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTopics}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentTopic ? (
          <div>
            <h4>Topic</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTopic.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTopic.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTopic.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/topics/" + currentTopic.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Topic...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicsList;
