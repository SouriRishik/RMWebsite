"use client";

import { Calendar } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GoVerified } from "react-icons/go";
import { LuCalendarClock, LuClock } from "react-icons/lu";
import { RiExternalLinkLine } from "react-icons/ri";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Work } from "@/lib/models";

import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { WorkDetailModal } from "./WorkDetailModal";

export default function WorkCard({ work }: { work: Work }): React.JSX.Element {
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			<Card className="flex h-full w-80 flex-col justify-center">
				<CardHeader className="relative overflow-hidden rounded-t-md p-0">
					<div
						className="flex h-64 w-full cursor-pointer items-center justify-center overflow-hidden"
						onClick={(): void => setModalOpen(true)}
						role="button"
						tabIndex={0}
						onKeyDown={(e): void => {
							if (e.key === "Enter") {
								setModalOpen(true);
							}
						}}>
						<Image
							src={work.image as string}
							alt={work.title}
							width={400}
							height={256}
							className={`block h-full w-full rounded-t-md object-cover transition-all duration-300 ease-in-out hover:scale-110 ${
								loading ? "animate-pulse bg-secondary blur-sm" : ""
							}`}
							onLoadingComplete={(): void => setLoading(false)}
						/>
					</div>
					<div className="flex flex-col items-start space-y-2 px-6 pt-3">
						<CardTitle>{work.title}</CardTitle>
						<span className="flex flex-row text-sm text-muted-foreground">
							<Calendar className="mr-2 h-4 w-4 text-primary" />
							{moment(work.date).fromNow()}
						</span>
					</div>
				</CardHeader>
				<CardContent>
					<CardDescription className="line-clamp-5">{work.description}</CardDescription>
				</CardContent>
				<CardFooter className="flex flex-col pb-4">
					<Separator className="mb-4" />
					<div className="flex w-full flex-row items-center justify-between">
						<Badge
							className="flex w-fit flex-row items-center justify-between space-x-2"
							variant={
								work.status.replace(" ", "").toLowerCase() as "completed" | "upcoming" | "inprogress"
							}>
							{work.status === "Completed" ? (
								<GoVerified />
							) : work.status === "Upcoming" ? (
								<LuCalendarClock />
							) : (
								<LuClock />
							)}
							<span>{work.status}</span>
						</Badge>
						{work.link && (
							<Link href={work.link} target="_blank" rel="noreferrer">
								<RiExternalLinkLine className="h-4 w-4 hover:text-blue-500" />
							</Link>
						)}
					</div>
				</CardFooter>
			</Card>

			<WorkDetailModal work={work} isOpen={modalOpen} onClose={(): void => setModalOpen(false)} />
		</>
	);
}
