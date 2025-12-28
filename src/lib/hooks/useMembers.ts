"use client";

import { useEffect, useState } from "react";
import { Image } from "sanity";

import { TeamMember } from "../models";
import { previewClient } from "../sanity/lib/client";
import { urlForImage } from "../sanity/lib/image";

export default function useMembers(): Record<string, TeamMember[]> {
	const [members, setMembers] = useState<Record<string, TeamMember[]>>({});
	useEffect(() => {
		async function fetchMembers(): Promise<void> {
			const query = `*[_type == "teamMember"] | order(year desc)`;
			const results = await previewClient.fetch<TeamMember[]>(query);
			results.forEach((result) => {
				result.image = urlForImage(result.image as Image);
				const yearNum = parseInt(String(result.year), 10);
				result.year = new Date(yearNum, 0, 1);
			});
			const years = results.map((result) => result.year.getFullYear());
			const uniqueYears = [...new Set(years)];
			const membersByYear: Record<string, TeamMember[]> = {};
			uniqueYears.forEach((year) => {
				membersByYear[year] = results.filter((result) => result.year.getFullYear() === year);
			});
			setMembers(membersByYear);
		}

		void fetchMembers();
	}, []);
	return members;
}
