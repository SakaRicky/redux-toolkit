import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

const Layout = ({ children }) => {
	return (
		<Box bg="#d9d9d9" color="#3b3b3b" height="100vh">
			<Sidebar />
			<Flex flexDirection="column" height="100%" marginLeft="65px">
				<Box>
					<Toolbar />
				</Box>
				<Box flexGrow={1}>{children}</Box>
			</Flex>
		</Box>
	);
};

export default Layout;
