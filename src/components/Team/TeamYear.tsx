"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { ShineBorder } from "../ui/shine-border";

export function DatePicker({
	date,
	setDate,
	minDate,
	maxDate,
}: {
	date: Date | undefined;
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
	minDate: Date | undefined;
	maxDate: Date | undefined;
}): React.ReactElement {
	const { resolvedTheme } = useTheme();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"flex h-12 w-full items-center justify-center rounded-full p-0 font-normal xs:w-12 xs:border",
						!date && "text-muted-foreground",
						resolvedTheme === "light" ? "xs:wave" : ""
					)}>
					<ShineBorder
						borderRadius={9999}
						borderWidth={resolvedTheme === "dark" ? 2 : 0}
						color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
						className="m-0 flex h-12 w-full items-center justify-center rounded-full p-0 xs:h-12 xs:w-12">
						<CalendarIcon className="h-4 w-4" />
						<p className="ml-2 block xs:hidden">{date ? format(date, "PPP") : <span>Pick a date</span>}</p>
					</ShineBorder>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0 xs:mr-3">
				<Calendar
					captionLayout="dropdown-buttons"
					mode="single"
					selected={date}
					onSelect={setDate}
					fromDate={minDate}
					toDate={maxDate}
				/>
			</PopoverContent>
		</Popover>
	);
}
