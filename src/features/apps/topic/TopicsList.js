import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TopicItem from "./TopicItem";
import TopicPagination from "./TopicPagination";
import { useGetTopicsMutation } from "./services/topicApi";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function TopicsList({
	filterTopics,
	getTopic,
	topicActive,
	setTopicActive,
	setCategoryActive,
}) {
	//DEFAULT LIST OF ALL TOPICS
	let topics = useSelector(state => state.topics.topics);
	const [getTopics] = useGetTopicsMutation();

	//FETCHING LIST OF TOPICS BY CATEGORY_ID FROM PARENT
	// const filterTopics

	if (filterTopics) {
		topics = filterTopics;
		// console.log("filterTopics 1: " + filterTopics  );
	}

	//HOW TO REPLACE topics with incoming filterTopics ??

	// setTopics('1');

	const [pagesPerPage] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			await getTopics();
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const indexOfLastPost = currentPage * pagesPerPage;
	const indexOfFirstPost = indexOfLastPost - pagesPerPage;

	const currentTopics = topics.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = pageNumber => {
		setCurrentPage(pageNumber);
	};

	const onMouseEnterTopicList = () => {
		setTopicActive(true);
		setCategoryActive(true);
	};

	const onMouseLeaveTopicList = () => {
		setTopicActive(false);
		setCategoryActive(false);
	};

	// console.log(currentTopics);

	{
		/* {isLoading && <div>Loading .... </div>} */
	}

	// <p className='mt-5 mb-3'>Showing {indexOfFirstPost  + 1} - {indexOfLastPost} of {topics.length} topics.</p>
	// <ul className="list-unstyled h-50 overflow-auto">
	//   {currentTopics.map((topic) => (
	//     <TopicItem
	//     key={topic.id} {...topic}
	//     getTopic={getTopic}
	//     />
	//   ))}
	// </ul>

	// {currentTopics.length > 4 && (
	//   <TopicPagination
	//     count={topics.length}
	//     paginate={paginate}
	//     pagesPerPage={pagesPerPage}
	//     currentPage={currentPage}
	//   />
	// )}

	return (
		<Box
			pos="fixed"
			top={0}
			left={0}
			h="100%"
			w={topicActive ? "30%" : "10%"}
			transition="all 0.2s ease-in-out"
			bg="gray.500"
			zIndex={2}
			p={8}
			paddingLeft="90px"
			onMouseEnter={onMouseEnterTopicList}
			onMouseLeave={onMouseLeaveTopicList}
		>
			<Heading opacity={topicActive ? 1 : 0} textAlign="center">
				Topics
			</Heading>
			<Box
				color="blackAlpha.800"
				// display={topicActive ? "block" : "none"}
				marginTop={8}
				lineHeight={10}
			>
				<Text color="white" fontSize="md">
					<Box as="span" opacity={topicActive ? 0 : 1}>
						H
					</Box>
					<Box as="span" display={topicActive ? "block" : "none"}>
						How to use Instagram Anakytics
					</Box>
				</Text>
				<Text color="white" fontSize="md">
					<Box as="span" opacity={topicActive ? 0 : 1}>
						6
					</Box>
					<Box as="span" display={topicActive ? "block" : "none"}>
						6 Ways to Use Twitter Analytics
					</Box>
				</Text>
				<Text color="white" fontSize="md">
					<Box as="span" opacity={topicActive ? 0 : 1}>
						H
					</Box>
					<Box as="span" display={topicActive ? "block" : "none"}>
						How to use Pinterest Anakytics
					</Box>
				</Text>
				<Text color="white" fontSize="md">
					<Box as="span" opacity={topicActive ? 0 : 1}>
						A
					</Box>
					<Box as="span" display={topicActive ? "block" : "none"}>
						A practical Guide to Email Marketing Metrics
					</Box>
				</Text>
				<Text color="white" fontSize="md">
					<Box as="span" opacity={topicActive ? 0 : 1}>
						F
					</Box>
					<Box as="span" display={topicActive ? "block" : "none"}>
						Fall Into Autumn 2022 With Your Membership Update
					</Box>
				</Text>
				<Text color="white" fontSize="md">
					<Box as="span" opacity={topicActive ? 0 : 1}>
						H
					</Box>
					<Box as="span" display={topicActive ? "block" : "none"}>
						How to use Instagram Anakytics
					</Box>
				</Text>
			</Box>
		</Box>
	);
}
