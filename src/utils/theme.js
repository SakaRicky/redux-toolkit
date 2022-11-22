import { extendTheme } from "@chakra-ui/react";

const config = {
	initialColorMode: "light",
	useSystemColorMode: false,
};

const theme = extendTheme({
	config,
	fonts: {
		body: `'Nunito Sans', sans-serif`,
	},
});

export default theme;
