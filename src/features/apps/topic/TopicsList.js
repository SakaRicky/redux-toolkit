import React, { useEffect, forwardRef } from "react";
import { useSelector } from "react-redux";
import { useGetTopicsMutation } from "./services/topicApi";
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
  Checkbox,
} from "@chakra-ui/react";
import Pagination from "@choc-ui/paginator";
import { Filter, Edit } from "react-feather";
export default function TopicsList({ filterTopics, getTopic }) {
  //DEFAULT LIST OF ALL TOPICS
  let topics = useSelector((state) => state.topics.topics);
  const [getTopics] = useGetTopicsMutation();

  //FETCHING LIST OF TOPICS BY CATEGORY_ID FROM PARENT
  // const filterTopics

  if (filterTopics) {
    topics = filterTopics;
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
      <div className="row">
        <div className="col-md-6 p-3 text-left">
          <Heading
            as="h1"
            fontSize={{ base: "14px", md: "24px" }}
            fontWeight="700"
          >
            Topics
          </Heading>
        </div>
        <div className="col-md-6 p-3 text-right">
          <Button leftIcon={<Edit size="15" />} colorScheme="blue" size="sm">
            Compose
          </Button>
        </div>
      </div>

      <input
        name="search"
        type="text"
        className="mt-3 form-control"
        placeholder="search topics"
      />

      <p className="mt-3 mb-1 small text-muted">
        Showing {indexOfFirstPost + 1} - {indexOfLastPost} of {topics.length}{" "}
        topics.
      </p>

      <Table
        maxW="100%"
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
                position: "top-right",
              });
            }}
            pageSize={pageSize}
            total={topics.length}
            itemRender={itemRender}
            paginationProps={{
              display: "flex",
              pos: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            colorScheme="red"
            focusRing="green"
          />
        </TableCaption>
        <Thead>
          <Tr>
            <Th width="2">
              <Checkbox></Checkbox>
            </Th>
            <Th></Th>
            <Th className="small" width="10">
              <Filter size={16} />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {new_topics.map((topic) => (
            <Tr key={topic.id}>
              <Td colspan="3" onClick={() => getTopic(topic.id)}>
                <span>{topic.title} </span>
                <span className="badge badge-info small">
                  {topic.post_status}
                </span>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
