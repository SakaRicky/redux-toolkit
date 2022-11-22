import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopicsList from "./TopicsList";
import TopicDetail from "./TopicDetail";
import CategoriesList from "../../categories/CategoriesList";
import { skipToken } from "@reduxjs/toolkit/query";
import { createSelector } from '@reduxjs/toolkit'
import { useTopicsQuery, useGetTopicsMutation, useGetTopicByIdQuery, useGetTopicsByCategoryIdQuery } from './services/topicApi';
import { Grid, GridItem } from '@chakra-ui/react';
import { Tabs, Typography, Row, Col, Avatar, Card, Button, Switch } from 'antd';

const TopicApp = () => {


    //@antd
    const { Meta } = Card;
    const { Title } = Typography;
    const { TabPane } = Tabs;
    
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
  const currentTopic = topicData_res.data;

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Oops, an error occured</div>;
  // }

  // console.log("useGetTopicsByCategoryIdQuery: " + JSON.stringify(data));


  return (

    <Grid
      w='94%'
      h='300px'
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(7, 1fr)'
      mt='0'
      ml="66"
      gap={3}
    >
      <GridItem colSpan={2} boxShadow="lg" p="0" bg="white" mt="-6" h='600px'>
          <CategoriesList 
              currentCategory={currentCategory}
              categoryChangeHandler={categoryChangeHandler}
            />
          <TopicsList 
            getTopic={getTopic}
            filterTopics={filterTopics}
          />
      </GridItem>

      <GridItem colSpan={3} p="3">
      { currentTopic ? ( 
            <TopicDetail 
              // {...currentTopic} 
              currentTopic={currentTopic}
            />
            ) : ''
          }
      </GridItem>

      <GridItem colSpan={2} h='620px' mr="-2">

        <Card hoverable="true" style={{ border:2, width: 300, marginTop: 16 }}>
            <Row>
              <Col span={4}>
                <Avatar src="https://joeschmoe.io/api/v1/random" />
                </Col>
              <Col span={20}>
                <Title level={5}>Topic author</Title>
                <p className="text-muted">Not assigned to any user. <Button>Invite!</Button></p>
              </Col>
            </Row>
        </Card>

        <Card hoverable="true" style={{ border:2, width: 300, marginTop: 16 }}>
          <Tabs>
          <TabPane tab="Title 1" key="1">
            <p>Search Bar <br/> Switch detail view<br/> Filter <br/> Listing with scrollable <br/> <h3>Html Content</h3></p>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <p>Content of Tab Pane 2</p>
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            <p>Content of Tab Pane 3</p>
          </TabPane>
          </Tabs>
        </Card>
      </GridItem>
    </Grid>


    
  );

};

export default TopicApp;