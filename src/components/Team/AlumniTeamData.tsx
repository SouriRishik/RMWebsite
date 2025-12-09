"use client";

import React, { useEffect, useMemo } from "react";

import TeamCategory from "@/components/Team/TeamCategory";
import useMembers from "@/lib/hooks/useMembers";

import { AlumniDatePicker } from "./AlumniDatePicker";

function AlumniTeamData(): React.ReactElement {
	const members = useMembers();
	const [date, setDate] = React.useState<Date | undefined>(undefined);
	const [displayYear, setDisplayYear] = React.useState<number | undefined>(undefined);
	const [alumniYears, setAlumniYears] = React.useState<number[]>([]);
	const [minDate, maxDate] = useMemo<[Date | undefined, Date | undefined]>(() => {
		if (Object.keys(members).length === 0) return [undefined, undefined];

		const currentYear = new Date().getFullYear();
		const alumniMembers = Object.entries(members).filter(([year]) => parseInt(year) <= currentYear - 1);

		if (alumniMembers.length === 0) return [undefined, undefined];

		const dates = alumniMembers.flatMap(([, yearMembers]) => yearMembers.map((member) => member.year));
		const minDate = dates.reduce((min, date) => (date < min ? date : min), dates[0]);
		const maxDate = dates.reduce((max, date) => (date > max ? date : max), dates[0]);
		return [minDate, maxDate];
	}, [members]);

	useEffect(() => {
		const currentYear = new Date().getFullYear();
		const collected = Object.keys(members)
			.map((year) => parseInt(year))
			.filter((year) => year <= currentYear - 1)
			.sort((a, b) => b - a);
		setAlumniYears(collected);
	}, [members]);

	useEffect(() => {
		if (!Array.isArray(alumniYears) || alumniYears.length === 0) return;
		if (typeof window === "undefined") return;
		const nav =
			typeof window.performance.getEntriesByType === "function"
				? window.performance.getEntriesByType("navigation")
				: [];
		const isReload =
			Array.isArray(nav) && nav.length > 0 && (nav[0] as PerformanceNavigationTiming).type === "reload";
		if (!isReload) return;
		const saved = window.localStorage.getItem("alumniYear");
		if (!saved) return;
		const y = parseInt(saved);
		if (Number.isNaN(y)) return;
		if (!alumniYears.includes(y)) return;
		const d = new Date();
		d.setFullYear(y);
		setDate(d);
		setDisplayYear(y);
	}, [alumniYears]);

	useEffect(() => {
		if (!maxDate || date) return;
		setDate(maxDate);
		setDisplayYear(maxDate.getFullYear());
	}, [maxDate, date]);

	useEffect(() => {
		if (!date) return;
		const y = date.getFullYear();
		const yearMembers = members[String(y)];
		if (Array.isArray(yearMembers) && y <= new Date().getFullYear() - 1) {
			setDisplayYear(y);
			if (typeof window !== "undefined") {
				window.localStorage.setItem("alumniYear", String(y));
			}
			return;
		}
		if (!Array.isArray(alumniYears) || alumniYears.length === 0) return;
		const sorted = [...alumniYears].sort((a, b) => a - b);
		let nearest: number | undefined = undefined;
		let bestDist = Number.POSITIVE_INFINITY;
		for (const candidate of sorted) {
			const dist = Math.abs(candidate - y);
			if (dist < bestDist || (dist === bestDist && (nearest === undefined || candidate > nearest))) {
				bestDist = dist;
				nearest = candidate;
			}
		}
		if (nearest !== undefined) setDisplayYear(nearest);
	}, [date, members, alumniYears]);

	return (
		<div className="relative z-0 mx-auto h-full w-full max-w-7xl px-4 py-10 sm:px-16 sm:py-16">
			<div className="mt-16 flex min-h-screen w-full flex-col items-center justify-center">
				{displayYear !== undefined && Array.isArray(members[String(displayYear)]) && (
					<TeamCategory details={members[String(displayYear)]} />
				)}
			</div>
			{minDate && maxDate && (
				<div className="fixed bottom-0 left-0 right-0 z-10 m-2 rounded-full shadow-md dark:shadow-none xs:bottom-10 xs:left-11 xs:right-auto xs:m-0 xs:w-fit">
					<AlumniDatePicker date={date} setDate={setDate} availableYears={alumniYears} />
				</div>
			)}
		</div>
	);
}

export default AlumniTeamData;
