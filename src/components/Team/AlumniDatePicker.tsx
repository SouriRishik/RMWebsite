"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { ShineBorder } from "../ui/shine-border";

export function AlumniDatePicker({
	date,
	setDate,
	availableYears = [],
}: {
	date: Date | undefined;
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	availableYears?: number[];
	minDate?: Date | undefined;
	maxDate?: Date | undefined;
}): React.ReactElement {
	const { resolvedTheme } = useTheme();
	const selectedYear = date?.getFullYear();

	function handleSelect(year: number): void {
		const newDate = new Date(date ?? new Date());
		newDate.setFullYear(year);
		setDate(newDate);
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"xs:wave flex h-12 w-full items-center justify-center rounded-full p-0 font-normal xs:w-12 ring-0 !border-0 !outline-none !shadow-none",
						!date && "text-muted-foreground"
					)}>
					<ShineBorder
						borderRadius={9999}
						borderWidth={resolvedTheme === "dark" ? 2 : 0}
						color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
						className="m-0 flex h-12 w-full items-center justify-center rounded-full p-0 xs:h-12 xs:w-12">
						<CalendarIcon className="h-4 w-4" />
						<p className="ml-2 block xs:hidden">{date ? format(date, "PPP") : <span>Pick a year</span>}</p>
					</ShineBorder>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-40 p-2 xs:mr-3">
				<div className="custom-scroll max-h-60 overflow-y-auto">
					<ul className="space-y-1">
						{availableYears.map((y): React.ReactElement => {
							const isActive = y === selectedYear;
							return (
								<li key={y}>
									<button
										type="button"
										onClick={(): void => handleSelect(y)}
										className={cn(
											"flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors",
											isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
										)}>
										<span>{`${y}-${(y + 1).toString().slice(-2)}`}</span>
										{isActive && <Check className="h-3.5 w-3.5" />}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
			</PopoverContent>
		</Popover>
	);
}
