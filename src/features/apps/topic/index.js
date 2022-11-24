/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import TopicsList from "./TopicsList";
import TopicDetail from "./TopicDetail";
import CategoriesList from "../../categories/CategoriesList";
import {
	useGetTopicByIdQuery,
	useGetTopicsByCategoryIdQuery,
} from "./services/topicApi";
import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";
import RightSidePane from "../../../components/RightSidePane";
import { Tabs, Typography, Row, Col, Avatar, Card, Button } from "antd";
import LeftSidePane from "../../../components/LeftSidePane";

const TopicApp = () => {
	//@antd
	const { Title } = Typography;
	const { TabPane } = Tabs;

	//GENERAL
	const [filter, setFilter] = useState(false);
	const [currentCategory, setCurrentCategory] = useState(null);
	const [currentCategoryId, setCurrentCategoryId] = useState(null); // initialize with skipToken to skip at first
	const [currentTopicId, setCurrentTopicId] = useState(null);

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

	const getTopic = id => {
		if (id === null) {
			setCurrentTopicId(0);
		} else {
			setCurrentTopicId(id);
		}
	};
	const topicData_res = useGetTopicByIdQuery({ id: currentTopicId });
	const currentTopic = topicData_res.data;

	const [showLeftSidebar, setShowLeftSidebar] = useState(false);
	const [showRightSidebar, setShowRightSidebar] = useState(false);

	return (
		<Box pos="relative" h="100%" overflowX="hidden">
			<Grid h="100%" borderTop="1px solid #969696" gap={2}>
				<GridItem
					colSpan={2}
					as="aside"
					boxShadow="2xl"
					p="2rem"
					bg="white"
					w="30%"
					pos="absolute"
					top="1px"
					left={showLeftSidebar ? 0 : "-30%"}
					bottom={0}
					transition="all 0.2s ease-in"
					zIndex={1}
				>
					<LeftSidePane
						setShowLeftSidebar={setShowLeftSidebar}
						setShowRightSidebar={setShowRightSidebar}
						showLeftSidebar={showLeftSidebar}
					>
						<CategoriesList
							currentCategory={currentCategory}
							categoryChangeHandler={categoryChangeHandler}
						/>
						<TopicsList getTopic={getTopic} filterTopics={filterTopics} />
					</LeftSidePane>
				</GridItem>
				<GridItem
					colSpan={3}
					p="6"
					pos="relative"
					backgroundColor="#e8e8e8"
					flexGrow={1}
					ml={showLeftSidebar ? "30%" : "0"}
					mr={showRightSidebar ? "30%" : "0"}
					transition="all 0.2s ease-out"
				>
					<Heading as="h3" size="2xl">
						Main Content Area
					</Heading>
					{currentTopic ? (
						<TopicDetail
							// {...currentTopic}
							currentTopic={currentTopic}
						/>
					) : (
						""
					)}
				</GridItem>
				<GridItem
					colSpan={2}
					as="aside"
					initial={{ x: 500, opacity: 1 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: 500, opacity: 0 }}
					boxShadow="lg"
					p="6"
					bg="white"
					w="30%"
					pos="absolute"
					top="1px"
					right={showRightSidebar ? 0 : "-30%"}
					transition="all 0.2s ease-in"
					bottom={0}
				>
					<RightSidePane
						setShowLeftSidebar={setShowLeftSidebar}
						setShowRightSidebar={setShowRightSidebar}
						showRightSidebar={showRightSidebar}
					>
						<Card
							hoverable="true"
							style={{ border: 2, width: 300, marginTop: 16 }}
						>
							<Row>
								<Col span={4}>
									<Avatar src="https://joeschmoe.io/api/v1/random" />
								</Col>
								<Col span={20}>
									<Title level={5}>Topic author</Title>
									<p className="text-muted">
										Not assigned to any user. <Button>Invite!</Button>
									</p>
								</Col>
							</Row>
						</Card>

						<Card
							hoverable="true"
							style={{ border: 2, width: 300, marginTop: 16 }}
						>
							<Tabs>
								<TabPane tab="Title 1" key="1">
									<p>
										Search Bar <br /> Switch detail view
										<br /> Filter <br /> Listing with scrollable <br />{" "}
									</p>
								</TabPane>
								<TabPane tab="Tab 2" key="2">
									<p>Content of Tab Pane 2</p>
								</TabPane>
								<TabPane tab="Tab 3" key="3">
									<p>Content of Tab Pane 3</p>
								</TabPane>
							</Tabs>
						</Card>
					</RightSidePane>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default TopicApp;
