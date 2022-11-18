import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopicsList from "./TopicsList";
import TodoList from "./redux/TodoList";
import TopicDetail from "./TopicDetail";
import CategoriesList from "../../categories/CategoriesList";
import axios from 'axios';
import { skipToken } from "@reduxjs/toolkit/query";

import { useGetTopicsByCategoryIdQuery } from './services/topicApi';

const TopicApp = () => {

  //GENERAL
  const dispatch = useDispatch();
  const apiUrl = "http://localhost:8080/api/topics/actions/read.php";
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState(false);
  
  const [filteredTopics, setFilteredTopics] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState(skipToken) // initialize with skipToken to skip at first
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentTopic, setCurrentTopic] = useState(null);

  const [interest, setInterest] = useState(null);
  const [response, setResponse] = useState(null);
  
  const categoryChangeHandler = (category_id) => {
    setCurrentCategory(category_id);
    setCurrentCategoryId(category_id);

    // alert(currentCategoryId);

    console.log("currentCategoryId: " + category_id);

    if (category_id === 0) {
      setFilter(false);
    } else {
      // dispatch(filterTopics({ category_id }));
      // // console.log( filterTopics({ category_id }) );
      // `https://jsonplaceholder.typicode.com/users`, { user }
        axios.get(apiUrl, {
          params: {
            category_id: category_id
          }}).then(res => {
          const data = res.data;
          // console.log("curr: " + apiUrl +currentCategory + " - " + data_topics +  JSON.stringify(res.data));
          setFilteredTopics(data);
        }).catch((err) => {
          setFilteredTopics("");
        });
      setFilter(true);
      setCurrentIndex(-1);
    }

  };
    // console.log(filteredTopics);

  const setActiveTopic = (topic, index) => {
    // console.log("setActiveTopic: " + JSON.stringify(topic));
    setCurrentTopic(topic);
    setCurrentIndex(index);
  };

  // console.log("currentCategoryId: " + currentCategoryId);

  // const { data, error, isLoading } = useGetTopicsByCategoryIdQuery({ category_id: 1 });
  const filteredTopics2 = useGetTopicsByCategoryIdQuery(currentCategoryId)
  const filterTopics = filteredTopics2['data'];

  console.log("filteredTopics2: " + filterTopics );


  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Oops, an error occured</div>;
  // }

  // console.log("useGetTopicsByCategoryIdQuery: " + JSON.stringify(data));


  return (
    <div className="container">
      <div className="row justify-content-center">
        {errorMessage}
        <div className="category col-md-3">
            <CategoriesList 
              currentCategory={currentCategory}
              categoryChangeHandler={categoryChangeHandler}
            />
        </div>
        <div className="title col-md-6">
          <TopicsList 
            setActiveTopic={setActiveTopic}
            filter={filter}
            filteredTopics={filteredTopics}
          />
          <TodoList 
            filterTopics={filterTopics}
          />
        </div>
        <div className="category col-md-3">
            <TopicDetail 
              currentTopic={currentTopic}
            />
        </div>
      </div>
    </div>
  );

};

export default TopicApp;