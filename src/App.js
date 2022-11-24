import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TopicApp from "./features/apps/topic";
import Layout from "./components/layout/Layout";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<TopicApp />} />
				<Route path="/topics" element={<TopicApp />} />
			</Routes>
		</Layout>
	);
}

export default App;
