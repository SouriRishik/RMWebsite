"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { Lightbox } from "@/components/ui/lightbox";
import useGallery from "@/lib/hooks/useGallery";
import { fadeIn, textVariant } from "@/lib/motion";

import SectionWrapper from "../wrappers/SectionWrapper";
import GalleryImage from "./GalleryImage";

export function GalleryView(): React.JSX.Element {
	const gallery = useGallery();
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleImageClick = (index: number): void => {
		setCurrentIndex(index);
		setLightboxOpen(true);
	};

	const handleNext = (): void => {
		setCurrentIndex((prev) => (prev + 1 < gallery.length ? prev + 1 : prev));
	};

	const handlePrev = (): void => {
		setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
	};

	return (
		<div className="mx-auto mt-32 flex min-h-screen w-full max-w-7xl flex-col items-center justify-center px-4 py-10 sm:px-16">
			<motion.div
				className="flex w-full flex-col items-center justify-center"
				variants={textVariant()}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}>
				<p className="text-[14px] uppercase tracking-wider text-foreground/80 sm:text-[18px]">Our Gallery</p>
				<h2 className="text-[30px] font-black text-foreground/90 xs:text-[40px] sm:text-[50px] md:text-[60px]">
					Gallery
				</h2>
			</motion.div>
			<motion.div
				className="flex min-h-screen w-full flex-col items-center justify-center py-10"
				variants={fadeIn("", "", undefined, 1)}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}>
				{gallery.length > 0 && (
					<ResponsiveMasonry
						className="flex h-full w-full py-10"
						columnsCountBreakPoints={{ 350: 1, 480: 2, 720: 3 }}>
						<Masonry gutter="1.5rem">
							{gallery.map((item, idx) => (
								<div
									key={idx}
									onClick={(): void => handleImageClick(idx)}
									role="button"
									tabIndex={0}
									onKeyDown={(e): void => {
										if (e.key === "Enter") {
											handleImageClick(idx);
										}
									}}>
									<GalleryImage item={item} />
								</div>
							))}
						</Masonry>
					</ResponsiveMasonry>
				)}
			</motion.div>

			<Lightbox
				isOpen={lightboxOpen}
				items={gallery}
				currentIndex={currentIndex}
				onClose={(): void => setLightboxOpen(false)}
				onNext={handleNext}
				onPrev={handlePrev}
			/>
		</div>
	);
}

export default SectionWrapper(GalleryView, "gallery");
