import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories
} from "./categorySlice";
import { Link } from "react-router-dom";

const CategoriesList = ( { currentCategory, categoryChangeHandler } ) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const categoriesFinal = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const initFetch = useCallback(() => {
    dispatch(getCategories());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])

  //PUSHING TO TOPICS
  // topics.map((topic) => categories.push(topic.category));
  // const categoriesFinal = ["All Categories", ...new Set(categories)];


  return (
      <div className="col-md-12">
        
        <ul className="list-group m-4">
          <li className="list-group-item" onClick={() => categoryChangeHandler(0)}>All</li>
          {categoriesFinal.map((category) => (
            <li
              key={category.id}
              className={
                category.title === currentCategory
                  ? "list-group-item active"
                  : "list-group-item"
              }
              onClick={() => categoryChangeHandler(category.id)}
            >
              {category.title}
            </li>
          ))}
      </ul>
      
      </div>
  );
};

export default CategoriesList;
