import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Image,
  Heading,
  Flex,
  Text,
  Grid,
  GridItem,
  Button,
  Box,
  useColorModeValue
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import axios from "axios";

const DetailCountry = () => {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const bg = useColorModeValue("#FAFAFA", "#202D36");

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://localhost:8080/api/topics/actions/single_read.php?id=${id}` //https://restcountries.com/v3.1/alpha/${cca3}
      );
      setData(response.data);
      console.log(response.data);
    })();
  }, [id]);

  return (
    <Box bg={bg}>

      {data?.map((topic) => {
        return (
          <React.Fragment key={topic.title}>
            <Button
              mt="40px"
              mb="20px"
              onClick={() => navigate(-1)}
              leftIcon={<ArrowBackIcon />}
              ml={{ base: "8", lg: "16" }}
            >
              Back
            </Button>
            <Grid
              templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
              alignContent="start"
              justifyContent="center"
              height={{ lg: "calc(100vh - 120px)" }}
              p={{ base: "28px", md: "48px", lg: "0" }}
            >
              <GridItem mx="auto" my="auto">
                <Box>
                  
                </Box>
              </GridItem>
              <GridItem>
                <Heading
                  mb="36px"
                  p="4"
                  fontSize="2rem"
                  as="h1"
                  textAlign={{ base: "c" }}
                >
                  {topic.title}
                </Heading>
                <Flex gap="42px" mb="58px" flexWrap="wrap" p="4">
                  <Flex flexDir="column" gap="4">
                    <Box>
                      <Text display="inline" fontWeight="bold">
                        Description:{" "}
                      </Text>
                      {topic.description.toLocaleString()}
                    </Box>
                  </Flex>
                </Flex>
              </GridItem>
            </Grid>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default DetailCountry;
