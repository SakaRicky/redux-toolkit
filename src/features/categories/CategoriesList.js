import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./categorySlice";
import { Link } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";

const CategoriesList = ({
	currentCategory,
	categoryChangeHandler,
	setTopicActive,
	setCategoryActive,
}) => {
	const [currentIndex, setCurrentIndex] = useState(-1);
	const categoriesFinal = useSelector(state => state.categories);
	const dispatch = useDispatch();
	const initFetch = useCallback(() => {
		dispatch(getCategories());
	}, [dispatch]);

	const [active, setActive] = useState(false);

	const onMouseEnterCategoryList = () => {
		setActive(true);
		setTopicActive(true);
		setCategoryActive(true);
	};

	const onMouseLeaveCategoryList = () => {
		setActive(false);
		setTopicActive(false);
		setCategoryActive(false);
	};

	useEffect(() => {
		initFetch();
	}, [initFetch]);

	//PUSHING TO TOPICS
	// topics.map((topic) => categories.push(topic.category));
	// const categoriesFinal = ["All Categories", ...new Set(categories)];

	// <ul className="list-group m-4">
	// 			<li className="list-group-item" onClick={() => categoryChangeHandler()}>
	// 				All
	// 			</li>
	// 			{categoriesFinal.map(category => (
	// 				<li
	// 					key={category.id}
	// 					className={
	// 						category.title === currentCategory
	// 							? "list-group-item active"
	// 							: "list-group-item"
	// 					}
	// 					onClick={() => categoryChangeHandler(category.id)}
	// 				>
	// 					{category.title}
	// 				</li>
	// 			))}
	// 		</ul>

	return (
		<Box
			pos="fixed"
			top={0}
			left={0}
			h="100%"
			w={active ? "250px" : "65px"}
			bg="white"
			zIndex={3}
			color="black"
			overflow="hidden"
			p="1rem"
			// display="none"
			transition="all 0.2s ease-in-out"
			onMouseEnter={onMouseEnterCategoryList}
			onMouseLeave={onMouseLeaveCategoryList}
		>
			<Flex direction="column" gap={8} marginTop="4rem">
				<Flex align="center" gap={2}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "30px" }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
						/>
					</svg>
					<Box
						display={active ? "block" : "none"}
						as="span"
						whiteSpace="nowrap"
					>
						All
					</Box>
				</Flex>
				<Flex align="center" gap={2}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "30px" }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
						/>
					</svg>

					<Box
						display={active ? "block" : "none"}
						as="span"
						whiteSpace="nowrap"
					>
						Digital Marketing
					</Box>
				</Flex>
				<Flex align="center" gap={2}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "30px" }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
						/>
					</svg>

					<Box
						display={active ? "block" : "none"}
						as="span"
						whiteSpace="nowrap"
					>
						SEO
					</Box>
				</Flex>
				<Flex align="center" gap={2}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "30px" }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
						/>
					</svg>

					<Box
						display={active ? "block" : "none"}
						as="span"
						whiteSpace="nowrap"
					>
						Google Ads
					</Box>
				</Flex>
				<Flex align="center" gap={2}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "30px" }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
						/>
					</svg>

					<Box
						display={active ? "block" : "none"}
						as="span"
						whiteSpace="nowrap"
					>
						Social Media
					</Box>
				</Flex>
				<Flex align="center" gap={2}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "30px" }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
						/>
					</svg>

					<Box
						display={active ? "block" : "none"}
						as="span"
						whiteSpace="nowrap"
					>
						Email Marketing
					</Box>
				</Flex>
				<Flex align="center" gap={2}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "30px" }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
						/>
					</svg>

					<Box
						display={active ? "block" : "none"}
						as="span"
						whiteSpace="nowrap"
					>
						Page Optimization
					</Box>
				</Flex>
				<Flex align="center" gap={2}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "30px" }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
						/>
					</svg>

					<Box
						display={active ? "block" : "none"}
						as="span"
						whiteSpace="nowrap"
					>
						Inbound Marketing
					</Box>
				</Flex>
				<Flex align="center" gap={2}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "30px" }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
						/>
					</svg>

					<Box
						display={active ? "block" : "none"}
						as="span"
						whiteSpace="nowrap"
					>
						Video Marketing
					</Box>
				</Flex>
			</Flex>
		</Box>
	);
};

export default CategoriesList;
