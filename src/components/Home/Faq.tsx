"use client";

import { motion } from "framer-motion";
import React from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { slideIn, textVariant } from "@/lib/motion";

import SectionWrapper from "../wrappers/SectionWrapper";

export function FAQ(): React.JSX.Element {
	return (
		<>
			<motion.div
				className="flex w-full flex-col items-center justify-center"
				variants={textVariant()}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}>
				<p className="text-[14px] uppercase tracking-wider text-foreground/80 sm:text-[18px]">FAQ</p>
				<h2 className="text-[30px] font-black text-foreground/90 xs:text-[40px] sm:text-[50px] md:text-[60px]">
					Questions
				</h2>
			</motion.div>
			<motion.div
				className="mt-10"
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				variants={slideIn("right", "spring", 0.1, 1)}>
				<Accordion type="single" collapsible>
					<AccordionItem value="1" variant={"question"}>
						<AccordionTrigger variant={"question"}>Which branch students can apply?</AccordionTrigger>
						<AccordionContent>
							MIT students from any discipline are encouraged to apply for the subsystem of their choice.
							It's essential that they have a genuine interest in the selected subsystem and are prepared
							to commit their time to gain expertise in it.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="4" variant={"question"}>
						<AccordionTrigger variant={"question"}>
							What are the networking opportunities avalible?
						</AccordionTrigger>
						<AccordionContent>
							You will have the opportunity to stay in touch with a diverse group of our alumni who can
							offer valuable guidance and assistance. Additionally, our alumni have established several
							startups, one of which is called Fracktal Works, where you can engage in ITR and gain
							extensive knowledge about robotics and various other subjects through internships.
							Furthermore, you will have the chance to interact with other like-minded individuals who
							share a strong interest in robotics.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="2" variant={"tip"}>
						<AccordionTrigger variant={"tip"}>
							Do i need to have prior exprience in coding/electronics to be a part of the team?
						</AccordionTrigger>
						<AccordionContent>
							Prior experience in coding or electronics is not a requirement. However, having a grasp of
							the fundamentals of electronics and understanding the logic behind how things work is
							essential.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="3" variant={"info"}>
						<AccordionTrigger variant={"info"}>
							What are the recent achievements of the team ?
						</AccordionTrigger>
						<AccordionContent>
							1. AIR 1 in Ather Byte Battles 2.0 in 2025 <br />
							2. Second Runner-Up at Robonautica, IISc Rhapsody 3.0 in 2025 <br />
							3. Runners up in Tech Solstice 2025 at MIT-Bengaluru <br />
							4. 1st place at Tech-TED Project Presentation in 2025 <br />
							5. Second runners up in Technoxian World Cup 2024 <br />
							6. Group Leaders in ABU ROBOCON Nationals 2024 <br />
							7. Received All India rank 21 in ABU ROBOCON'23 <br />
							8. AIR 2 in the World Robotics Olympiad in 2018 <br />
							9. AIR 9 in ABU ROBOCON in 2016
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="5" variant={"info"}>
						<AccordionTrigger variant={"info"}>
							What are the research projects that team is curently working on?
						</AccordionTrigger>
						<AccordionContent>
							1. KARMA: A 6-DOF robotic arm mounted on a mobile base, capable of autonomous navigation and
							performing tasks such as object detection, picking, and placing. Built for real-world task
							execution using advanced motion planning and intelligent control. <br />
							2. Angulator: A compact, real-time orientation tracking device that provides precise yaw,
							pitch, and roll data using an nRF module with ESB wireless communication. Designed for
							multi-robot motion analysis with ultra-low latency and easy mounting. <br />
							3. Swerve Drive: An omnidirectional drive-train in which all wheels are independently
							steered and driven, enabling highly agile and precise movement for competition robots.{" "}
							<br />
							4. RMMD V2 (RoboManipal Motor Driver): Developed the second iteration of an in-house motor
							driver, fully integrated as a standalone ROS node for direct robot communication. Optimized
							the power stage to significantly reduce power consumption compared to the validated V1
							prototype, while retaining reverse-current protection. <br />
							5. Tachometer: A fully in-house-built tachometer featuring a microcontroller unit, custom
							PCB, and LED display for accurate RPM measurement and system monitoring. <br />
							6. FarmBot: It is an autonomous field robot that combines computer vision, soil sensing, and
							AI-based disease detection to give Indian farmers real-time, actionable insights for
							reducing crop loss and promoting sustainable farming. <br />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</motion.div>
		</>
	);
}

export default SectionWrapper(FAQ, "FAQ");
