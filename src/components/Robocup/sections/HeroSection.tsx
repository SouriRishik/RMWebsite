"use client";

import { motion } from "framer-motion";
// import Link from "next/link";
import { ChevronLeft, ChevronRight, FileText, Play, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import useRoboCupVideos from "@/lib/hooks/useRoboCupVideos";
import { RoboCupVideo } from "@/lib/models";
import { fadeIn, textVariant } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function HeroSection(): React.ReactElement {
	const [isVideoOpen, setIsVideoOpen] = useState(false);
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
	const roboCupVideos = useRoboCupVideos();
	const [videos, setVideos] = useState<RoboCupVideo[]>([]);

	useEffect(() => {
		setVideos(roboCupVideos);
	}, [roboCupVideos]);

	useEffect(() => {
		// Dependencies tracked for cleanup
	}, [videos, currentVideoIndex]);

	const handleNextVideo = (): void => {
		setCurrentVideoIndex((prev) => (prev + 1 < videos.length ? prev + 1 : prev));
	};

	const handlePrevVideo = (): void => {
		setCurrentVideoIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
	};
	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-background via-background to-background/50">
			{/* Background Effect */}
			<div className="absolute inset-0 z-0">
				<div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
				<div className="absolute bottom-40 right-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
			</div>

			<div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-12 sm:-mt-12 sm:px-6 sm:pt-0 lg:px-8">
				<div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
					{/* Left Content */}
					<motion.div
						variants={textVariant()}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="mx-auto flex w-full flex-col items-center text-center lg:mx-0 lg:w-auto lg:items-start lg:text-left">
						<h1 className="pl-4 text-5xl font-black uppercase leading-tight text-foreground/90 xs:text-6xl sm:pl-0 sm:text-7xl md:text-8xl lg:text-8xl">
							RoboCup
							<br />
							<span className="-ml-3 -mt-2 block text-primary sm:-ml-0 sm:-mt-0">@Work</span>
						</h1>
						<p className="mt-6 max-w-xl text-base text-foreground/70 sm:mt-8 sm:text-lg md:text-xl">
							RoboCup@Work is an international robotics competition designed to advance the capabilities
							of autonomous robots in industrial and logistical environments. The challenge promotes
							innovation in robotics technology, encouraging solutions for complex real-world tasks such
							as precise object recognition, manipulation, and autonomous navigation in dynamic settings.
						</p>
						<div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
							<motion.a
								variants={fadeIn("up", "spring", 0.2, 0.65)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}
								href="/RoboCup-TDP.pdf"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:scale-105 hover:shadow-lg">
								<FileText className="h-5 w-5" />
								Team Description Paper
							</motion.a>
							<motion.button
								variants={fadeIn("up", "spring", 0.25, 0.65)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}
								onClick={(): void => setIsVideoOpen(true)}
								className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/50 px-8 py-3 font-semibold text-primary transition-all hover:border-primary hover:bg-primary/10">
								<Play className="h-5 w-5" />
								Watch Videos
							</motion.button>
						</div>
					</motion.div>

					{/* Right - Logo */}
					<motion.div
						variants={fadeIn("left", "spring", 0.2, 0.65)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}
						className="flex justify-center">
						<div className="relative h-96 w-96">
							<Image
								src="/rcup_logo.jpg"
								alt="RoboCup@Work Logo"
								fill
								className="object-contain"
								priority
							/>
						</div>
					</motion.div>
				</div>
			</div>

			{/* Video Modal */}
			{isVideoOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
					onClick={(): void => setIsVideoOpen(false)}
					role="dialog"
					aria-modal="true"
					aria-label="Video player modal">
					<div
						className="relative flex h-full max-h-[90vh] w-full max-w-4xl flex-col items-center justify-center overflow-hidden rounded-lg"
						onClick={(e: React.MouseEvent<HTMLDivElement>): void => e.stopPropagation()}>
						<button
							onClick={(): void => setIsVideoOpen(false)}
							className="absolute right-0 top-16 z-50 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-white/20"
							aria-label="Close modal">
							<X className="h-6 w-6" />
						</button>
						<video
							key={currentVideoIndex}
							src={videos[currentVideoIndex]?.video}
							controls
							autoPlay
							className="h-auto w-full"
						/>
						<div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
							<p className="text-center text-lg font-semibold">{videos[currentVideoIndex]?.caption}</p>
							<p className="text-center text-sm text-gray-300">
								{currentVideoIndex + 1} / {videos.length}
							</p>
						</div>
						{videos.length > 1 && (
							<>
								<button
									onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
										e.stopPropagation();
										handlePrevVideo();
									}}
									className={cn(
										"absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-white/20",
										currentVideoIndex === 0 && "cursor-not-allowed opacity-50"
									)}
									disabled={currentVideoIndex === 0}
									aria-label="Previous video">
									<ChevronLeft className="h-6 w-6" />
								</button>
								<button
									onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
										e.stopPropagation();
										handleNextVideo();
									}}
									className={cn(
										"absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-white/20",
										currentVideoIndex === videos.length - 1 && "cursor-not-allowed opacity-50"
									)}
									disabled={currentVideoIndex === videos.length - 1}
									aria-label="Next video">
									<ChevronRight className="h-6 w-6" />
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
