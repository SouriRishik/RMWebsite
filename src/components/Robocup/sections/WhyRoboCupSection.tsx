"use client";

import { motion } from "framer-motion";
import { Award, Cog, Lightbulb, Users } from "lucide-react";
import React from "react";

import { fadeIn, textVariant } from "@/lib/motion";

export default function WhyRoboCupSection(): React.ReactElement {
	const reasons = [
		{
			icon: Award,
			title: "International Recognition",
			description: "Compete with the best teams globally and showcase our innovations on the world stage",
		},
		{
			icon: Cog,
			title: "Applied Industrial Automation",
			description: "Develop autonomous and automation solutions inspired by real-world workplace environments",
		},
		{
			icon: Lightbulb,
			title: "Research & Innovation",
			description:
				"Experiment with algorithms, electronics, and mechanical design to build innovative, real-world robotic systems",
		},
		{
			icon: Users,
			title: "Team Excellence",
			description: "Foster collaboration, learning, and growth within our team and the robotics community",
		},
	];

	return (
		<div className="relative w-full overflow-hidden bg-background px-4 py-20 sm:-mt-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<motion.div
					variants={textVariant()}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="mb-16 text-center">
					<h2 className="text-5xl font-black uppercase text-foreground/90 xs:text-6xl sm:text-7xl">
						Why
						<br />
						<span className="hidden sm:inline">RoboCup</span>
						<span className="sm:hidden">
							RoboCup
							<br />
						</span>
						<span className="hidden text-primary sm:inline">@Work</span>
						<span className="block text-primary sm:hidden">@Work</span>
					</h2>
				</motion.div>

				<p className="mx-auto mb-16 max-w-3xl text-center text-lg text-foreground/70 md:text-xl">
					Participating in RoboCup@Work allows Team RoboManipal to showcase its innovation, compete at an
					international level, and contribute to advancements in robotics technology. We aim not just to
					compete, but also to set benchmarks in precision, efficiency, and adaptability.
				</p>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{reasons.map((reason, idx) => {
						const Icon = reason.icon;
						return (
							<motion.div
								key={idx}
								variants={fadeIn("up", "spring", idx * 0.1, 0.65)}
								initial="hidden"
								whileInView="show"
								viewport={{ once: true }}
								className="group rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-accent/5 p-8 transition-all hover:border-primary/50 hover:shadow-xl">
								<Icon className="mb-6 h-12 w-12 text-primary transition-transform group-hover:scale-110" />
								<h3 className="mb-3 text-xl font-bold text-foreground/90">{reason.title}</h3>
								<p className="text-foreground/60">{reason.description}</p>
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
