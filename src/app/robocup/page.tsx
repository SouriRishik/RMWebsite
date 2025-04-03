import Image from "next/image";
import React from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Page(): React.ReactElement {
	return (
		<>
			<Navbar />
			<div className="min-h-screen w-full bg-black px-10 py-16 text-white">
				<div className="mx-auto max-w-7xl">
					{/* RoboCup@Work Section */}
					<div className="mt-10 grid items-center gap-10 md:grid-cols-[2fr_1fr]">
						<div>
							<h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">RoboCup@Work</h2>
							<p className="mt-5 max-w-[700px] text-justify tracking-tight text-gray-600 dark:text-gray-400 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
								RoboCup@Work is an international robotics competition designed to advance the
								capabilities of autonomous robots in industrial and logistical environments. The
								challenge promotes innovation in robotics technology, encouraging solutions for complex
								real-world tasks such as precise object recognition, manipulation, and autonomous
								navigation in dynamic settings.
							</p>
						</div>
						<div className="flex justify-center">
							<Image
								src="/rcup_logo.jpg"
								width={1000}
								height={150}
								alt="RoboCup@Work Logo"
								className="rounded-lg"
							/>
						</div>
					</div>

					{/* Our Robot: KARMA Section */}
					<div className="mt-10 grid items-center gap-10 md:grid-cols-[3fr_2fr]">
						{/* Wider Karma Image */}
						<div>
							<Image
								src="/karma2_edited.jpg"
								layout="intrinsic"
								width={700} // Adjust as needed
								height={100} // Keep height fixed
								alt="KARMA Robot"
								className="rounded-lg"
							/>
						</div>

						<div>
							<h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Our Robot: KARMA</h2>
							<p className="mt-5 max-w-[700px] text-justify tracking-tight text-gray-600 dark:text-gray-400 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
								Our robot, KARMA, is a product of rigorous engineering and creative problem-solving.
								Developed entirely in-house, KARMA features a cost-effective design, including a
								custom-built robotic arm made from easily accessible materials. Its electronics,
								mechanical structures, and software systems, including navigation and object detection
								modules, are optimized for performance and ease of manufacturing.
							</p>
						</div>
					</div>

					{/* Why We Compete Section */}
					<div className="mt-16 text-center">
						<h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Why RoboCup@Work</h2>
						<p className="mt-5 max-w-[1370px] text-justify tracking-tight text-gray-600 dark:text-gray-400 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
							Participating in RoboCup@Work allows Team RoboManipal to showcase its innovation, compete at
							an international level, and contribute to advancements in robotics technology. We aim not
							just to compete, but also to set benchmarks in precision, efficiency, and adaptability.
						</p>
					</div>

					{/* Bottom 3 Images - Uniform Size */}
					<div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
						<Image
							src="/rcup1.png"
							width={350}
							height={250}
							alt="Competition Image 1"
							className="rounded-lg"
						/>
						<Image
							src="/rcup2.png"
							width={350}
							height={250}
							alt="Competition Image 2"
							className="rounded-lg"
						/>
						<Image
							src="/rcup3.png"
							width={350}
							height={250}
							alt="Competition Image 3"
							className="rounded-lg"
						/>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
