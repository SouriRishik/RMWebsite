"use client";

import { motion } from "framer-motion";
import React, { useEffect } from "react";

import useWork from "@/lib/hooks/useWorks";
import { Work } from "@/lib/models";
import { fadeIn, textVariant } from "@/lib/motion";

import SectionWrapper from "../wrappers/SectionWrapper";
import WorkCard from "./WorkCard";

export function WorkData(): React.ReactElement {
	const works = useWork();
	const [status, setStatus] = React.useState<Record<string, Work[]>>({});

	useEffect(() => {
		if (works.length > 0) {
			const status: Record<string, Work[]> = {};
			works.forEach((work) => {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				if (!status[work.status]) status[work.status] = [];
				status[work.status].push(work);
			});
			setStatus(status);
		}
	}, [works]);

	return (
		<div className="mt-32 flex min-h-screen w-full flex-col items-center justify-center">
			{Object.keys(status).map((key) => (
				<div className="flex h-full w-full flex-col items-center justify-center">
					<motion.div
						className="flex w-full flex-col items-center justify-center"
						variants={textVariant()}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}>
						<h2 className="text-[30px] font-black uppercase text-foreground/90 xs:text-[40px] sm:text-[50px] md:text-[60px]">
							{key}
						</h2>
						<p className="tracking-pretty hidden text-balance text-center text-foreground/60 sm:flex sm:text-[18px]">
							We are committed to pushing the boundaries of technology through ongoing research and
							development initiatives. Our team of experts is dedicated to exploring innovative solutions
							to address real-world challenges. Currently, we are actively engaged in the following
							research projects:
						</p>
					</motion.div>
					<div
						className="pl-27 sm:pl-31 my-16 ml-[66px] grid w-full max-w-7xl snap-x snap-mandatory 
							auto-cols-[20rem] grid-flow-col items-start gap-20 overflow-x-auto overflow-y-hidden pr-8 scrollbar-hide sm:ml-[82px] sm:auto-cols-[25rem] 
							sm:pr-12 lg:ml-[118px] lg:auto-cols-[22rem] lg:pl-40 lg:pr-16"
						style={{ scrollPaddingRight: "6rem" }}>
						{status[key].map((work) => (
							<motion.div
								key={work.title}
								className="mr-8 inline-block snap-start"
								variants={fadeIn("up", "spring", 0.2, 0.65)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}>
								<WorkCard work={work} />
							</motion.div>
						))}
						{/* spacer to ensure last card fully visible on all viewports */}
						<div className="w-8 shrink-0" />
					</div>
				</div>
			))}
		</div>
	);
}

export default SectionWrapper(WorkData, "Work");
