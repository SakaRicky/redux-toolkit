import { Box, Button, Heading, Select, Stack } from "@chakra-ui/react";
import React from "react";

const LeftSidePane = ({
	showLeftSidebar,
	setShowLeftSidebar,
	setShowRightSidebar,
}) => {
	const categoriesOptions = [
		{ value: "all", label: "All" },
		{ value: "seo", label: "SEO" },
		{ value: "googleAds", label: "Google Ads" },
		{ value: "socialMedia", label: "Social Media" },
		{ value: "emailMarketing", label: "Email Marketing" },
		{ value: "pageOptimization", label: "Page Optimization" },
		{ value: "inboundMarketing", label: "Inbound Marketing" },
		{ value: "videoMarketing", label: "Video Marketing" },
	];
	return (
		<Box w="100%">
			<Box
				pos="absolute"
				top="30%"
				left="96%"
				w={showLeftSidebar ? 35 : 70}
				height={35}
				p={showLeftSidebar ? 2 : 0}
				display="flex"
				alignItems="center"
				bg="#fff"
				border="1px solid #808080"
				cursor="pointer"
				borderRadius={showLeftSidebar ? "50%" : "50px"}
				onClick={() => {
					setShowLeftSidebar(!showLeftSidebar);
					setShowRightSidebar(false);
				}}
			>
				{showLeftSidebar ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
						/>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						style={{ width: "50%", height: "70%", marginLeft: 24 }}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
						/>
					</svg>
				)}
			</Box>
			<Box>
				<Select placeholder="Select Category" size="md" variant="outline">
					{categoriesOptions.map(option => (
						<option
							key={option.value}
							value={option.value}
							label={option.label}
						></option>
					))}
				</Select>
				<Button colorScheme="blue">Button</Button>
				<Stack spacing={3}>
					<Select variant="outline" placeholder="Outline" />
					<Select variant="filled" placeholder="Filled" />
					<Select variant="flushed" placeholder="Flushed" />
					<Select variant="unstyled" placeholder="Unstyled" />
				</Stack>
			</Box>
		</Box>
	);
};

export default LeftSidePane;
