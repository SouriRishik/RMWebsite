"use client";

import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import useSponsors from "@/lib/hooks/useSponsors";
import { slideIn, textVariant } from "@/lib/motion";

import SectionWrapper from "../wrappers/SectionWrapper";

export function Sponsors(): React.JSX.Element {
	const sponsors = useSponsors();
	const player = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const LIGHT_OVERRIDES: Record<string, string> = {
		OnlyScrews: "/sponsors/OnlyScrews.png",
		"Fracktal Works": "/sponsors/FracktalWorks.png",
	};
	return (
		<>
			<motion.div
				className="flex w-full flex-col items-center justify-center"
				variants={textVariant()}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}>
				<p className="text-[14px] uppercase tracking-wider text-foreground/80 sm:text-[18px]">Our Partners</p>
				<h2 className="text-[30px] font-black text-foreground/90 xs:text-[40px] sm:text-[50px] md:text-[60px]">
					Notable Sponsors
				</h2>
			</motion.div>
			<motion.div
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
				variants={slideIn("left", "spring", 0.1, 1)}>
				<Carousel
					plugins={[player.current]}
					onMouseEnter={player.current.stop}
					onMouseLeave={(): void => player.current.play()}
					opts={{
						loop: true,
						align: "start",
					}}
					className="w-full">
					<CarouselContent>
						{sponsors.map((sponsor, index) => (
							<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
								<div className="p-1">
									<Card className="border-none">
										<CardContent className="flex h-72 cursor-pointer items-center justify-center p-6">
											<Link href={sponsor.url} target="_blank" rel="noopener noreferrer">
												<Image
													src={
														mounted &&
														resolvedTheme === "light" &&
														LIGHT_OVERRIDES[sponsor.name]
															? LIGHT_OVERRIDES[sponsor.name]
															: (sponsor.image as string)
													}
													alt={sponsor.name}
													width={40}
													height={40}
													priority={
														mounted &&
														resolvedTheme === "light" &&
														!!LIGHT_OVERRIDES[sponsor.name]
													}
													className={
														mounted &&
														resolvedTheme === "light" &&
														LIGHT_OVERRIDES[sponsor.name]
															? "h-full w-full object-contain mix-blend-multiply contrast-125 transition-none"
															: "h-full w-full object-contain contrast-125 drop-shadow-md transition-none dark:mix-blend-normal dark:contrast-100"
													}
												/>
											</Link>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</motion.div>
		</>
	);
}

export default SectionWrapper(Sponsors, "Sponsors");
