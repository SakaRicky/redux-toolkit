import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTopics,
  findTopicsByTitle,
  deleteAllTopics,
} from "./slices";
import { Link } from "react-router-dom";

const TopicsList = ({ filter, filteredTopics, setActiveTopic, setCurrentTopic }) => {

  const dispatch = useDispatch();
  const [searchTitle, setSearchTitle] = useState("");
  const topics = useSelector(state => state.topic);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");

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
      
      <div className="col-md-6">
      <p className='mt-5'>Based on RTK. src/apps/topic/TopicsList.</p>
        {/* showing {filter ? filteredTopics.length : topics.length}  */}

        <ul className="list-group">
          
          {!filter && topics &&
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
            

            {filter && filteredTopics && filteredTopics.map((topic, index) => (
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
      </div>
    </div>


  );
};

export default TopicsList;
