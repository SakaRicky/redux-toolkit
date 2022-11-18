import { Image, Text, Heading, Box, useColorModeValue } from "@chakra-ui/react";

function PreviewCard({ item }) {
  const bgCard = useColorModeValue("#fff", "#2B3743");
  return (
    <Box
      as="article"
      h="21rem"
      w="16.5rem"
      bg={bgCard}
      borderRadius="6px"
      boxShadow="lg"
      mb="18"
    >
      <Box ml="24px" mt="28px">
        <Heading as="h2" fontSize="18px" fontWeight="bold" mr="4">
          {item?.title}
        </Heading>
        <Box mt="14px" fontSize="14px">
          <Text>
            <Box as="span" fontWeight="bold">
            description :
            </Box>{" "}
            {item?.description.toLocaleString()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

export default PreviewCard;
