"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { fadeIn, textVariant } from "@/lib/motion";

export default function KARMAShowcase(): React.ReactElement {
	return (
		<div className="relative w-full overflow-hidden bg-background px-4 py-20 sm:-mt-20 sm:px-6 md:py-0 md:-mt-[1100px] lg:py-20 lg:-mt-20 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<motion.div
					variants={textVariant()}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="mb-16 text-center">
					<h2 className="text-5xl font-black uppercase text-foreground/90 xs:text-6xl sm:text-7xl">
						Our Robot
						<br />
						<span className="text-primary">KARMA</span>
					</h2>
				</motion.div>

				<div className="grid gap-12 lg:grid-cols-2 lg:items-center">
					{/* Image - Full width on mobile, half on desktop */}
					<motion.div
						variants={fadeIn("right", "spring", 0.2, 0.75)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}>
						<div className="relative flex h-auto items-center justify-center overflow-hidden rounded-2xl bg-muted/30 p-4 shadow-2xl">
							<Image
								src="/karma2_edited.jpg"
								alt="KARMA Robot"
								width={600}
								height={400}
								className="object-contain"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</div>
					</motion.div>

					{/* Content */}
					<motion.div
						variants={fadeIn("left", "spring", 0.2, 0.75)}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}>
						<div className="space-y-6">
							<p className="text-lg leading-relaxed text-foreground/70 md:text-xl">
								KARMA is a testament to Team RoboManipal's engineering excellence and innovation.
								Developed entirely in-house, KARMA features a cost-effective design, including a
								custom-built robotic arm made from easily accessible materials. Its electronics,
								mechanical structures, and software systems, including navigation and object detection
								modules, are optimized for performance and ease of manufacturing.
							</p>

							<div className="space-y-4">
								<h3 className="text-2xl font-bold text-foreground/90">Key Features:</h3>
								<ul className="space-y-3">
									{[
										{
											title: "Custom Robotic Arm",
											desc: "Precision manipulation using accessible materials",
										},
										{
											title: "Advanced Navigation",
											desc: "Autonomous path planning in dynamic environments",
										},
										{
											title: "Vision System",
											desc: "Real-time object detection and recognition",
										},
										{
											title: "Optimized Electronics",
											desc: "High-performance, energy-efficient systems",
										},
									].map((feature, idx) => (
										<motion.li
											key={idx}
											variants={fadeIn("up", "spring", idx * 0.1, 0.65)}
											className="flex gap-4">
											<div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20">
												<div className="h-2 w-2 rounded-full bg-primary" />
											</div>
											<div>
												<p className="font-semibold text-foreground/90">{feature.title}</p>
												<p className="text-sm text-foreground/60">{feature.desc}</p>
											</div>
										</motion.li>
									))}
								</ul>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
