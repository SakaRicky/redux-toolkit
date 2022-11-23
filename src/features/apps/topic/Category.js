import { Box } from "@chakra-ui/react";
import React from "react";

const Category = ({ categoryActive, setCategoryActive }) => {
	return (
		<Box
			pos="fixed"
			top={0}
			left={0}
			h="100%"
			w={categoryActive ? "35%" : "15%"}
			bg="green.500"
			zIndex={1}
			onMouseEnter={() => setCategoryActive(true)}
			onMouseLeave={() => setCategoryActive(false)}
		>
			Third Column
		</Box>
	);
};

export default Category;
