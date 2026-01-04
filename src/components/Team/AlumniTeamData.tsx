"use client";

import React, { useEffect, useMemo } from "react";

import TeamCategory from "@/components/Team/TeamCategory";
import useMembers from "@/lib/hooks/useMembers";

import { AlumniDatePicker } from "./AlumniDatePicker";

const CURRENT_ACADEMIC_YEAR_START = 2025;

function AlumniTeamData(): React.ReactElement {
	const members = useMembers();
	const [date, setDate] = React.useState<Date | undefined>(undefined);
	const [displayYear, setDisplayYear] = React.useState<number | undefined>(undefined);
	const [alumniYears, setAlumniYears] = React.useState<number[]>([]);
	const [minDate, maxDate] = useMemo<[Date | undefined, Date | undefined]>(() => {
		if (Object.keys(members).length === 0) return [undefined, undefined];

		const alumniMembers = Object.entries(members).filter(([year]) => {
			const yearNum = parseInt(year);
			return yearNum < CURRENT_ACADEMIC_YEAR_START;
		});

		if (alumniMembers.length === 0) return [undefined, undefined];

		const startYears = alumniMembers.map(([year]) => parseInt(year));
		const minYear = Math.min(...startYears);
		const maxYear = Math.max(...startYears);

		return [new Date(minYear, 0, 1), new Date(maxYear, 0, 1)];
	}, [members]);

	useEffect(() => {
		const collected = Object.keys(members)
			.map((year) => parseInt(year))
			.filter((year) => year < CURRENT_ACADEMIC_YEAR_START)
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
		if (Array.isArray(yearMembers)) {
			if (y < CURRENT_ACADEMIC_YEAR_START) {
				setDisplayYear(y);
				if (typeof window !== "undefined") {
					window.localStorage.setItem("alumniYear", String(y));
				}
				return;
			}
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
				<div className="fixed bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full shadow-md dark:shadow-none sm:left-6 sm:right-auto sm:translate-x-0">
					<AlumniDatePicker date={date} setDate={setDate} availableYears={alumniYears} />
				</div>
			)}
		</div>
	);
}

export default AlumniTeamData;
