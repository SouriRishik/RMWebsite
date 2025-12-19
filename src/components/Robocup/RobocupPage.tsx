"use client";

import React from "react";

import SectionWrapper from "../wrappers/SectionWrapper";
import GallerySection from "./sections/GallerySection";
import HeroSection from "./sections/HeroSection";
import KARMAShowcase from "./sections/KARMAShowcase";
import ProgressSection from "./sections/ProgressSection";
import WhyRoboCupSection from "./sections/WhyRoboCupSection";

function RobocupPage(): React.ReactElement {
	return (
		<div className="w-full">
			<HeroSection />
			<KARMAShowcase />
			<ProgressSection />
			<WhyRoboCupSection />
			<GallerySection />
		</div>
	);
}

export default SectionWrapper(RobocupPage, "RoboCup");
