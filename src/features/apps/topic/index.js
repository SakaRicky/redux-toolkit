import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopicsList from "./TopicsList";
import TopicDetail from "./TopicDetail";
import CategoriesList from "../../categories/CategoriesList";
import { skipToken } from "@reduxjs/toolkit/query";
import { createSelector } from "@reduxjs/toolkit";
import {
	useTopicsQuery,
	useGetTopicsMutation,
	useGetTopicByIdQuery,
	useGetTopicsByCategoryIdQuery,
} from "./services/topicApi";
import { Container, Box } from "@chakra-ui/react";
import Category from "./Category";

const TopicApp = () => {
	//GENERAL
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [filter, setFilter] = useState(false);
	const [filteredTopics, setFilteredTopics] = useState(null);
	const [currentCategory, setCurrentCategory] = useState(null);
	const [currentCategoryId, setCurrentCategoryId] = useState(null); // initialize with skipToken to skip at first
	const [currentTopicId, setCurrentTopicId] = useState(null);

	/// ONCLICK CATEGORY FILTER
	const categoryChangeHandler = category_id => {
		if (category_id === 0) {
			setFilter(false);
		} else {
			setFilter(true);
			setCurrentCategory(category_id);
			setCurrentCategoryId(category_id);
		}
	};
	const filteredTopics_rtk = useGetTopicsByCategoryIdQuery({
		category_id: currentCategory,
	});
	const filterTopics = filteredTopics_rtk["data"];

	////// GET TOPIC DETAIL
	const getTopic = id => {
		if (id === null) {
			setCurrentTopicId(0);
		} else {
			/// FETCH TOPIC DETAILS
			setCurrentTopicId(id);
		}
	};
	const topicData_res = useGetTopicByIdQuery({ id: currentTopicId });
	const currentTopic = topicData_res.data;

	// if (isLoading) {
	//   return <div>Loading...</div>;
	// }
	// if (error) {
	//   return <div>Oops, an error occured</div>;
	// }

	// console.log("useGetTopicsByCategoryIdQuery: " + JSON.stringify(data));

	const [topicActive, setTopicActive] = useState(false);
	const [categoryActive, setCategoryActive] = useState(false);

	return (
		<Box bg="blue.600">
			{/* <CategoriesList
				setTopicActive={setTopicActive}
				setCategoryActive={setCategoryActive}
				currentCategory={currentCategory}
				categoryChangeHandler={categoryChangeHandler}
			/>
			<TopicsList
				topicActive={topicActive}
				setTopicActive={setTopicActive}
				setCategoryActive={setCategoryActive}
				getTopic={getTopic}
				filterTopics={filterTopics}
			/>
			<Category
				categoryActive={categoryActive}
				setCategoryActive={setCategoryActive}
			/>
			{currentTopic ? (
				<TopicDetail {...currentTopic} currentTopic={currentTopic} />
			) : (
				""
			)} */}
			Topic
		</Box>
	);
};

export default TopicApp;
