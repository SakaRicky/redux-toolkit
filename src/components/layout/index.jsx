import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
    
	return (
        <Box bg="#d9d9d9" minHeight="100vh">
            <Navbar/>
            <Sidebar />
            <main>{children}</main>
        </Box>
	);
};

export default Layout;