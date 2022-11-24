import { Select } from "@chakra-ui/react";
import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./categorySlice";

const CategoriesList = ({ currentCategory, categoryChangeHandler }) => {
  const categoriesFinal = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const initFetch = useCallback(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <div className="col-md-12">
      <Select variant="outline">
        <option value="">Select Category</option>
        {categoriesFinal &&
          categoriesFinal.map((category) => (
            <option
              onClick={() => categoryChangeHandler(category.id)}
              value={category.title}
              key={category.id}
            >
              {category.title}
            </option>
          ))}
      </Select>
    </div>
  );
};

export default CategoriesList;
