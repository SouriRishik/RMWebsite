"use client";

import React, { useEffect, useMemo } from "react";

import TeamCategory from "@/components/Team/TeamCategory";
import useMembers from "@/lib/hooks/useMembers";

import SectionWrapper from "../wrappers/SectionWrapper";
import { DatePicker } from "./TeamYear";

export function TeamData(): React.ReactElement {
	const members = useMembers();
	const [date, setDate] = React.useState<Date | undefined>(undefined);
	const [years, setYears] = React.useState<number[]>([]);
	const [minDate, maxDate] = useMemo<[Date | undefined, Date | undefined]>(() => {
		if (Object.keys(members).length === 0) return [undefined, undefined];
		const dates = Object.values(members).flatMap((year) => year.map((member) => member.year));
		const minDate = dates.reduce((min, date) => (date < min ? date : min), dates[0]);
		const maxDate = dates.reduce((max, date) => (date > max ? date : max), dates[0]);
		return [minDate, maxDate];
	}, [members]);

	useEffect(() => {
		setYears(Object.keys(members).map((year) => parseInt(year)));
	}, [members]);

	useEffect(() => {
		if (!maxDate || date) return;
		setDate(maxDate);
	}, [maxDate]);

	console.log(date, date?.getFullYear(), members);

	return (
		<div className="relative">
			<div className="mt-16 flex min-h-screen w-full flex-col items-center justify-center">
				{years.length > 0 && date && date.getFullYear().toString() in members && (
					<TeamCategory details={members[date.getFullYear().toString()]} />
				)}
			</div>
			{minDate && maxDate && (
				<div className="fixed bottom-0 right-0 z-10 xs:bottom-8 xs:right-10">
					<DatePicker date={date} setDate={setDate} minDate={minDate} maxDate={maxDate} />
				</div>
			)}
		</div>
	);
}

export default SectionWrapper(TeamData, "Team");
