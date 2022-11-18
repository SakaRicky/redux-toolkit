import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import TodoPagination from './TodoPagination';
import { useGetTopicsMutation } from '../services/topicApi';

export default function TodoList() {
  const topics = useSelector((state) => state.topics.topics);

  console.log("TODOS: " + JSON.stringify(topics));

  const [getTopics, { isLoading }] = useGetTopicsMutation();

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

  console.log(currentTopics);

  return (
    <>
      {isLoading && <div>Loading .... </div>}

      <p className='mt-5'>Based on RTK & RTK Query. src/apps/topic/redux/TodoList</p>
      <p className="mb-4">Category change not yet implemented.</p>

      <ul className="list-unstyled h-50 overflow-auto">
        {currentTopics.map((topic) => (
          <TodoItem 
          key={topic.id} {...topic} />
        ))}
      </ul>

      {currentTopics.length > 4 && (
        <TodoPagination
          count={topics.length}
          paginate={paginate}
          pagesPerPage={pagesPerPage}
          currentPage={currentPage}
        />
      )}

    </>
  );
}
