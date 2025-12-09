"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

import { subsystemText } from "@/lib/constants";
import { TeamMember } from "@/lib/models";
import { textVariant } from "@/lib/motion";

import TeamCard from "./TeamCard";

const SubSystemSection = ({ subsystem, details }: { subsystem: string; details: TeamMember[] }): React.JSX.Element => {
	const members = useMemo(
		() => {
			const filtered = details.filter((member) => {
				const role = (member.role || "").toLowerCase();
				return (
					Boolean(member.subsystem) &&
					member.subsystem === subsystem &&
					(role === "member" || role === "senior member")
				);
			});
			return filtered.sort((a, b) => {
				const roleA = (a.role || "").toLowerCase();
				const roleB = (b.role || "").toLowerCase();
				if (roleA === "senior member" && roleB !== "senior member") return -1;
				if (roleA !== "senior member" && roleB === "senior member") return 1;
				return 0;
			});
		},
		[details, subsystem]
	);
	const subKey = (subsystem || "").toLowerCase();
	const subText = subsystemText[subKey];
	return (
		<>
			{members.length === 0 ? null : (
				<>
					<motion.div
						className="flex w-full flex-col items-center justify-center"
						variants={textVariant()}
						initial="hidden"
						whileInView="show"
						viewport={{ once: true }}>
						<h2 className="text-[30px] font-black uppercase text-foreground/90 xs:text-[40px] sm:text-[50px] md:text-[60px]">
							{subsystem}
						</h2>
						{subText && (
							<>
								<span className="tracking-pretty hidden text-center font-bold text-foreground/80 sm:flex sm:text-[18px]">
									"{subText.split("\n")[0]}"
								</span>
								<p className="tracking-pretty mt-2 hidden text-balance text-center text-foreground/60 sm:flex sm:text-[18px]">
									{subText.split("\n")[subText.split("\n").length - 1]}
								</p>
							</>
						)}
					</motion.div>
					<div className="my-16 flex flex-wrap items-center justify-center gap-16">
						{members.map((member) => (
							<TeamCard member={member} />
						))}
					</div>
				</>
			)}
		</>
	);
};

const HeadDetails = ({ details }: { details: TeamMember[] }): React.JSX.Element => {
	const managers = useMemo(
		() =>
			details.filter((member) => {
				const role = (member.role || "").toLowerCase();
				return role.includes("team") || role.includes("tech lead");
			}),
		[details]
	);
	const heads = useMemo(
		() =>
			details.filter((member) => {
				const role = (member.role || "").toLowerCase();
				return role.includes("head") || role === "founder";
			}),
		[details]
	);

	if (managers.length === 0 && heads.length === 0) {
		return <></>;
	}

	return (
		<>
			<motion.div
				className="flex w-full flex-col items-center justify-center"
				variants={textVariant()}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}>
				<h2 className="text-[30px] font-black uppercase text-foreground/90 xs:text-[40px] sm:text-[50px] md:text-[60px]">
					Team Heads
				</h2>
				<span className="tracking-pretty hidden text-center font-bold text-foreground/80 sm:flex sm:text-[18px]">
					"At the helm of Robomanipal's robotics team, our dedicated heads lead with unwavering commitment and
					expertise."
				</span>
				<p className="tracking-pretty mt-2 hidden text-balance text-center text-[12px] text-foreground/60 sm:flex sm:text-[18px]">
					At the forefront of Robomanipal's robotics team stand our dedicated heads, driving our collective
					efforts forward with unwavering commitment and expertise. With their expertise and commitment, they
					inspire us to pursue innovation and excellence in every project. Under their guidance, we navigate
					the intricate challenges of robotics with confidence, charting a course toward success in our field.
				</p>
			</motion.div>
			<div className="my-16 flex flex-wrap items-center justify-center gap-16">
				{managers.map((member) => (
					<TeamCard member={member} />
				))}
			</div>
			<div className="mb-16 flex flex-wrap items-center justify-center gap-16">
				{heads.map((member) => (
					<TeamCard member={member} />
				))}
			</div>
		</>
	);
};

export default function TeamCategory({ details }: { details: TeamMember[] }): React.ReactElement {
	const subsystems = useMemo(() => {
		const subsystems = new Set<string>();
		details.forEach((member) => {
			if (member.subsystem) subsystems.add(member.subsystem);
		});
		return Array.from(subsystems);
	}, [details]);

	return (
		<>
			<HeadDetails details={details} />
			{subsystems.map((subsystem) => (
				<SubSystemSection subsystem={subsystem} details={details} />
			))}
		</>
	);
}
