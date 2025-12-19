import React from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RobocupPage from "@/components/Robocup/RobocupPage";

export default function Page(): React.ReactElement {
	return (
		<>
			<Navbar />
			<RobocupPage />
			<Footer />
		</>
	);
}
