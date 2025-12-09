import React from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AlumniTeamData from "@/components/Team/AlumniTeamData";

export default function AlumniTeamPage(): React.ReactElement {
	return (
		<>
			<Navbar />
			<div className="flex min-h-screen items-center justify-center">
				<AlumniTeamData />
			</div>
			<Footer />
		</>
	);
}
