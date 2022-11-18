import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Flex, Input } from "@chakra-ui/react";
import PreviewCard from "./PreviewCard";
import FilterBox from "./FilterBox";

const ListOfCountries = ({ id }) => {
  const [data_topics, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [optionUrl, setOptionUrl] = useState("");

  const apiUrl = "http://localhost:8080/api/topics/actions/read.php";

  useEffect(() => {
    try {
      if (localStorage.getItem("countriesData")) {
        const result = JSON.parse(localStorage.getItem("countriesData"));
        searchQuery
          ? setData(
              result.filter((x) =>
                x.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
            )
          : optionUrl
          ? setData(
              result.filter((x) =>
                x.region.toLowerCase().includes(optionUrl.toLowerCase())
              )
            )
          : setData(result);
        setErrorMessage("");
      } else
        (async () => {
          const res = await fetch(apiUrl);
          const data = await res.json();
          const data_topics = data['topics'];
          setData(data_topics);
          console.log("DATA 2: " + JSON.stringify(data_topics));
          // localStorage.setItem("countriesData", JSON.stringify(data_topics));
        })();
    } catch (error) {
      setErrorMessage(`Cannot get ${error}`);
    }
  }, [searchQuery, optionUrl]);

  return (
    <>
      <Flex
        justify={{ base: "start", md: "space-between" }}
        flexWrap="wrap"
        gap={{ base: "4", md: "0" }}
      >
        <Input
          type="search"
          placeholder="Search for a country..."
          maxW="480px"
          boxShadow="sm"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FilterBox setOptionUrl={setOptionUrl} />
      </Flex>

      <Flex
        wrap="wrap"
        gap="1rem"
        align="center"
        justify={{ base: "center", md: "space-between" }}
        mt="12"
        pb="16"
      >
        {errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          data_topics?.map((item, index) => {
            return (
              <Link to={`/country/${item.id}`} key={index}>
                <PreviewCard item={item} />
              </Link>
            );
          })
        )}
      </Flex>
    </>
  );
};

export default ListOfCountries;