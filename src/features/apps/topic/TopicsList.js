import React, { useState, useEffect, forwardRef } from 'react';
import { useSelector } from 'react-redux';
import TopicItem from './TopicItem';
import TopicPagination from './TopicPagination';
import { useGetTopicsMutation } from './services/topicApi';
import {
  Table,
  Thead,
  Tbody,
  Button,
  Heading,
  Tr,
  Th,
  Td,
  TableCaption,
  Spinner,
  useToast,
  Checkbox
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { Filter } from 'react-feather';
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

    //// CHAKRA-UI PAGINATION COMPONENT
    const toast = useToast();
    const [loading, setLoading] = React.useState(true);
    const [current, setCurrent] = React.useState(1);
    const pageSize = 5;
    const offset = (current - 1) * pageSize;
    const new_topics = topics.slice(offset, offset + pageSize);

    const indexOfLastPost = current * pageSize;
    const indexOfFirstPost = indexOfLastPost - pageSize;

  useEffect(() => {
    const fetchData = async () => {
      await getTopics();
    };
    fetchData();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const Prev = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Prev
    </Button>
  ));
  const Next = forwardRef((props, ref) => (
    <Button ref={ref} {...props}>
      Next
    </Button>
  ));

  const itemRender = (_, type) => {
    if (type === "prev") {
      return Prev;
    }
    if (type === "next") {
      return Next;
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <>
      {/* <Heading top={0} bg="blackAlpha.300" w="full" p={15} pos="fixed">
        Page {current}{" "}
      </Heading> */}

        <Heading
          as="h1"
          fontSize={{ base: "14px", md: "24px" }}
          fontWeight="700"
        >
          Topics
        </Heading>
      <input name="search" type="text" className='mt-0 form-control m-1' placeholder='search topics' />

      <div className="row justify-content-center mt-4 mb-2">
        <div className='col-md-9'>
          <Checkbox>toggleSelect</Checkbox>
        </div>
        <div className='col-md-3 pull-right small'>
          <Filter
            size={22}
           /> 
        </div>
      </div>

      <p className='mt-3 mb-1'>Showing {indexOfFirstPost + 1} - {indexOfLastPost} of {topics.length} topics.</p>

      <Table
        maxW="98%"
        m={0}
        mt={2}
        shadow="base"
        rounded="lg"
        bg="white.700"
        variant="simple"
      >
        <TableCaption>
          <Pagination
            current={current}
            onChange={(page) => {
              setCurrent(page);
              toast({
                title: "Pagination.",
                description: `You changed to page ${page}`,
                variant: "solid",
                duration: 1000,
                isClosable: true,
                position: "top-right"
              });
            }}
            pageSize={pageSize}
            total={topics.length}
            itemRender={itemRender}
            paginationProps={{
              display: "flex",
              pos: "absolute",
              left: "50%",
              transform: "translateX(-50%)"
            }}
            colorScheme="red"
            focusRing="green"
          />
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Title</Th>
          </Tr>
        </Thead>
        <Tbody>
          {new_topics.map((topic) => (
            <Tr key={topic.id}>
              <Td onClick={() => getTopic(topic.id)}> {topic.title} </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );  


/*
  return loading ? (
    <>
      
      <Heading
          as="h1"
          fontSize={{ base: "14px", md: "24px" }}
          fontWeight="700"
        >
          Topics
        </Heading>
      <input name="search" type="text" className='mt-0 form-control m-1' placeholder='search topics' />

      <div className="row justify-content-center mt-2 mb-2">
        <div className='col-md-6'>
          <input name="selectAll" type="checkbox" /> toggleSelect
        </div>
        <div className='col-md-6 text-right'>
          filter_icon
        </div>
      </div>

      <p className='mt-2 mb-1'>Showing {indexOfFirstPost  + 1} - {indexOfLastPost} of {topics.length} topics.</p>

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
*/

}
