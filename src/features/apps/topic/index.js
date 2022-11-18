import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopicsList from "./TopicsList";
import TopicDetail from "./TopicDetail";
import CategoriesList from "../../categories/CategoriesList";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetTopicByIdQuery, useGetTopicsByCategoryIdQuery } from './services/topicApi';


const TopicApp = () => {

  //GENERAL
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null) // initialize with skipToken to skip at first
  const [currentTopicId, setCurrentTopicId] = useState(null);

  /// ONCLICK CATEGORY FILTER
  const categoryChangeHandler = (category_id) => {
    if (category_id === 0) {
      setFilter(false);
    } else {
      setFilter(true);
      setCurrentCategory(category_id);
      setCurrentCategoryId(category_id); 
    }
  };
  const filteredTopics_rtk = useGetTopicsByCategoryIdQuery({ category_id: currentCategory })
  const filterTopics = filteredTopics_rtk['data'];


  ////// GET TOPIC DETAIL
  const getTopic = (id) => {
    if (id === null) {
      setCurrentTopicId(0);
    } else {
      /// FETCH TOPIC DETAILS
      setCurrentTopicId(id);
    }
  };
  const topicData_res = useGetTopicByIdQuery({ id: currentTopicId })
  const topicData = topicData_res['data'];


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
            getTopic={getTopic}
            filterTopics={filterTopics}
          />
        </div>
        <div className="category col-md-3">
            <TopicDetail 
              currentTopic={topicData}
            />
        </div>
      </div>
    </div>
  );

};

export default TopicApp;