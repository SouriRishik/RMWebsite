"use client";

import React, { useEffect } from "react";

import TeamCategory from "@/components/Team/TeamCategory";
import useMembers from "@/lib/hooks/useMembers";
import { TeamMember } from "@/lib/models";

function CurrentTeamData(): React.ReactElement {
	const members = useMembers();
	const [currentTeamMembers, setCurrentTeamMembers] = React.useState<TeamMember[]>([]);

	useEffect(() => {
		const currentYear = new Date().getFullYear();
		const yearMembers = members[String(currentYear)];
		setCurrentTeamMembers(Array.isArray(yearMembers) ? yearMembers : []);
	}, [members]);

	return (
		<div className="relative z-0 mx-auto h-full w-full max-w-7xl px-4 py-10 sm:px-16 sm:py-16">
			<div className="mt-16 flex min-h-screen w-full flex-col items-center justify-center">
				{currentTeamMembers.length > 0 && <TeamCategory details={currentTeamMembers} />}
			</div>
		</div>
	);
}

export default CurrentTeamData;
