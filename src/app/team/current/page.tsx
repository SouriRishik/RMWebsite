import React from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import CurrentTeamData from "@/components/Team/CurrentTeamData";

export default function CurrentTeamPage(): React.ReactElement {
	return (
		<>
			<Navbar />
			<div className="flex min-h-screen items-center justify-center">
				<CurrentTeamData />
			</div>
			<Footer />
		</>
	);
}
