"use client";

import { X } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoVerified } from "react-icons/go";
import { LuCalendarClock, LuClock } from "react-icons/lu";
import { RiExternalLinkLine } from "react-icons/ri";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Work } from "@/lib/models";

interface WorkDetailModalProps {
	work: Work;
	isOpen: boolean;
	onClose: () => void;
}

export function WorkDetailModal({ work, isOpen, onClose }: WorkDetailModalProps): React.ReactElement | null {
	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-label="Work detail modal">
			<Button
				onClick={onClose}
				variant="ghost"
				size="icon"
				className="absolute right-4 top-4 text-white hover:bg-white/20"
				aria-label="Close modal">
				<X className="h-6 w-6" />
			</Button>

			<div
				className="relative flex max-h-[90vh] w-full max-w-2xl flex-col gap-4 overflow-y-auto rounded-lg bg-background p-6 shadow-lg scrollbar-hide"
				onClick={(e): void => e.stopPropagation()}>
				<div className="flex flex-col gap-3">
					<h2 className="text-2xl font-bold">{work.title}</h2>
					<div className="flex flex-row items-center gap-3">
						<span className="text-sm text-muted-foreground">{moment(work.date).fromNow()}</span>
						<Badge
							className="flex w-fit flex-row items-center justify-between gap-2"
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
					</div>
				</div>

				<div className="relative h-64 w-full overflow-hidden rounded-md">
					<Image
						src={work.image as string}
						alt={work.title}
						fill
						className="object-contain"
						sizes="(max-width: 768px) 90vw, 600px"
						priority
					/>
				</div>

				<div className="flex flex-col gap-2">
					<h3 className="font-semibold">Description</h3>
					<p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
						{work.description}
					</p>
				</div>

				{work.link && (
					<Link href={work.link} target="_blank" rel="noopener noreferrer" className="mt-4 w-full">
						<Button className="w-full gap-2">
							<RiExternalLinkLine className="h-4 w-4" />
							View Project
						</Button>
					</Link>
				)}
			</div>
		</div>
	);
}
