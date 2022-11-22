import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";

const RightSidePane = ({
	showRightSidebar,
	setShowLeftSidebar,
	setShowRightSidebar,
}) => {
	return (
		<Box w="100%">
			<Heading as="h3" size="lg">
				RightSidePane
			</Heading>
			<Button
				pos="absolute"
				top="30%"
				right="96%"
				w={showRightSidebar ? 30 : 70}
				ml={showRightSidebar ? 10 : 0}
				height={30}
				p={showRightSidebar ? 4 : 0}
				bg="#fff"
				border="1px solid #808080"
				borderRadius="50px"
				onClick={() => {
					setShowRightSidebar(!showRightSidebar);
					setShowLeftSidebar(false);
				}}
			>
				{showRightSidebar ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "50%", height: "70%", marginRight: 24 }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
						/>
					</svg>
				)}
			</Button>
		</Box>
	);
};

export default RightSidePane;
