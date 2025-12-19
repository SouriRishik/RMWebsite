"use client";

import { motion } from "framer-motion";
import React from "react";

import { fadeIn, textVariant } from "@/lib/motion";

export default function ProgressSection(): React.ReactElement {
	const improvements = [
		{
			year: "Last Year",
			status: "Achieved",
			items: [
				"Developed IMU + Encoder Data acquisition system for base and made custom closed loop controllers for stepper motors on the arm",
				"Implemented 2D mapping, autonomous navigation and basic arm manipulation tests",
				"Made first iteration of in-house 6-D.O.F robotic arm with fully functional links and joints",
			],
		},
		{
			year: "This Year",
			status: "Current Focus",
			items: [
				"Upgraded 3 joints to Custom made BLDC actuators and upgraded safety systems",
				"Implemented dead wheel odometry for improved mapping and navigation",
				"Designed and developed the base structure and major degrees of freedom of KARMA, incorporating improved materials, a custom actuator system, and optimized gearboxes for BLDC motors",
			],
		},
		{
			year: "Next Year",
			status: "Goals",
			items: [
				"Real-time multi-object handling Upgrade all joints with custom made bldc actuators and shift to CAN for communication",
				"Implementing 3D mapping using RTAB and advanced navigation",
				"Aiming to improve modularity, compatibility and material strength while reducing overall weight",
			],
		},
	];

	return (
		<div className="relative w-full overflow-hidden bg-gradient-to-b from-background/50 via-background to-background px-4 py-20 sm:-mt-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<motion.div
					variants={textVariant()}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="mb-16 text-center">
					<h2 className="pl-3 text-5xl font-black uppercase text-foreground/90 xs:text-6xl sm:pl-0 sm:text-7xl">
						Progress
						<br />
						<span className="-ml-2 text-primary sm:-ml-0">Journey</span>
					</h2>
					<p className="mt-4 text-lg text-foreground/60">Tracking our improvements year over year</p>
				</motion.div>

				<div className="grid gap-8 md:grid-cols-3">
					{improvements.map((item, idx) => (
						<motion.div
							key={idx}
							variants={fadeIn("up", "spring", idx * 0.15, 0.65)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className="group rounded-2xl border border-primary/20 bg-gradient-to-br from-background to-background/50 p-8 transition-all hover:border-primary/50 hover:shadow-2xl">
							<div className="mb-6">
								<h3 className="text-2xl font-bold text-foreground/90">{item.year}</h3>
							</div>

							<div className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-2">
								<p className="text-sm font-semibold text-primary">{item.status}</p>
							</div>

							<ul className="space-y-3">
								{item.items.map((improvement, i) => (
									<li key={i} className="flex items-start gap-3">
										<div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
										<span className="leading-relaxed text-foreground/70">{improvement}</span>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
