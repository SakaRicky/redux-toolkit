import { Heading, Flex, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
  const navColor = useColorModeValue("#fff", "#2B3743");
  return (
    <Flex
      as="nav"
      h="20"
      bg={navColor}
      w="full"
      justify="space-between"
      align="center"
      px={{ base: "1rem", md: "20" }}
      boxShadow="sm"
      className="mb-4"
    >
      <Link to="/">
        <Heading
          as="h1"
          fontSize={{ base: "14px", md: "24px" }}
          fontWeight="700"
        >
          Contentify
        </Heading>
      </Link>
    </Flex>
  );
};

export default Navbar;