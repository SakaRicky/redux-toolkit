import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopicsList from "./TopicsList";
import TopicDetail from "./TopicDetail";
import CategoriesList from "../../categories/CategoriesList";
import { skipToken } from "@reduxjs/toolkit/query";
import { createSelector } from '@reduxjs/toolkit'
import { useTopicsQuery, useGetTopicsMutation, useGetTopicByIdQuery, useGetTopicsByCategoryIdQuery } from './services/topicApi';


const TopicApp = () => {

  //GENERAL
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState(false);
  const [filteredTopics, setFilteredTopics] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentCategoryId, setCurrentCategoryId] = useState(null) // initialize with skipToken to skip at first
  const [currentTopicId, setCurrentTopicId] = useState(null);

  const { data } = useTopicsQuery();
  console.log("data: " + JSON.stringify(data));

  const userId = useState(1);

  console.log("userId: " + userId);

  /// NEW FUNCTION
  const selectTopicsForCategory = useMemo(() => {
    const emptyArray = []
    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      res => res.data,
      (res, userId) => userId,
      (data, userId) => data?.filter(topic => topic.category_id === userId) ?? emptyArray
    )
  }, [])

  
  // Use the same posts query, but extract only part of its data
  const { topicsForCategory } = useTopicsQuery(undefined, {
    selectFromResult: result => ({
      // We can optionally include the other metadata fields from the result here
      ...result,
      // Include a field called `topicsForCategory` in the hook result object,
      // which will be a filtered list of posts
      topicsForCategory: selectTopicsForCategory(result, userId)
    })
  })
  /// NEW FUNCTION

  console.log("topicsForCategory: " + topicsForCategory);



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
        <div className="title col-md-4">
          <TopicsList 
            getTopic={getTopic}
            filterTopics={filterTopics}
          />
        </div>
        <div className="category col-md-5">
            <TopicDetail 
              currentTopic={topicData}
            />
        </div>
      </div>
    </div>
  );

};

export default TopicApp;