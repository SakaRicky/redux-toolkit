import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TopicItem from './TopicItem';
import TopicPagination from './TopicPagination';
import { useGetTopicsMutation } from './services/topicApi';

export default function TopicsList({ filterTopics, getTopic }) {

  //DEFAULT LIST OF ALL TOPICS
  let topics = useSelector((state) => state.topics.topics);
  const [getTopics] = useGetTopicsMutation();

  //FETCHING LIST OF TOPICS BY CATEGORY_ID FROM PARENT
  // const filterTopics

  if (filterTopics) {
    topics=filterTopics;
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // console.log(currentTopics);

  return (
    <>
      {/* {isLoading && <div>Loading .... </div>} */}

      <p className='mt-5 mb-3'>Showing {indexOfFirstPost  + 1} - {indexOfLastPost} of {topics.length} topics.</p>
      <ul className="list-unstyled h-50 overflow-auto">
        {currentTopics.map((topic) => (
          <TopicItem 
          key={topic.id} {...topic} 
          getTopic={getTopic}
          />
        ))}
      </ul>

      {currentTopics.length > 4 && (
        <TopicPagination
          count={topics.length}
          paginate={paginate}
          pagesPerPage={pagesPerPage}
          currentPage={currentPage}
        />
      )}

    </>
  );
}
