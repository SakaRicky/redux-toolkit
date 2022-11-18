import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopicsList from "./TopicsList";
import TodoList from "./redux/TodoList";
import TopicDetail from "./TopicDetail";
import CategoriesList from "../../categories/CategoriesList";
import axios from 'axios';

const TopicApp = () => {

  //GENERAL
  const dispatch = useDispatch();
  const apiUrl = "http://localhost:8080/api/topics/actions/read.php";
  const [errorMessage, setErrorMessage] = useState("");
  const [filter, setFilter] = useState(false);
  
  const [filteredTopics, setFilteredTopics] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentTopic, setCurrentTopic] = useState(null);

  const [interest, setInterest] = useState(null);
  const [response, setResponse] = useState(null);
  
  const categoryChangeHandler = (category_id) => {
    setCurrentCategory(category_id);
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

    useEffect(() => {
      // If you want do do some other action after
      // the response is set do it here. This useEffect will only fire
      // when response changes.
   }, [response]); // Makes the useEffect dependent on response.

   /*
   function searchTopics() {
      axios.get(url).then(res => {
         // Handle Your response here.
         // Likely you may want to set some state
         setResponse(res);
      });
   };

   function HandleChange(event) {
      setInterest(event.target.value);
   };
   */

  const setActiveTopic = (topic, index) => {
    // console.log("setActiveTopic: " + JSON.stringify(topic));
    setCurrentTopic(topic);
    setCurrentIndex(index);
  };


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