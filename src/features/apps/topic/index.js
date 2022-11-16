import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TopicsList from "./TopicsList";
import CategoriesList from "../../categories/CategoriesList";
import { filterTopics } from "./slices";


const TopicApp = () => {

  //GENERAL
  const dispatch = useDispatch();
  const topics = useSelector(state => state.topics);
  const filteredTopics = useSelector((state) => state.filteredTopics);

  const [filter, setFilter] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("");

  // console.log(topics);
  
  const categoryChangeHandler = (category_id) => {
    setCurrentCategory(category_id);
    if (category_id === 0) {
      setFilter(false);
    } else {
      dispatch(filterTopics({ category_id }));
      // console.log( filterTopics({ category_id }) );
      setFilter(true);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="category col-md-3">
            <CategoriesList 
              currentCategory={currentCategory}
              categoryChangeHandler={categoryChangeHandler}
            />
        </div>
        <div className="title col-md-6">
          <TopicsList 
            filter={filter}
            filteredTopics={filteredTopics}
          />
        </div>
      </div>
    </div>
  );

};

export default TopicApp;