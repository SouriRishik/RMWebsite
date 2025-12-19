"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import useRoboCupGallery from "@/lib/hooks/useRoboCupGallery";
import { RoboCupGalleryItem } from "@/lib/models";
import { fadeIn, textVariant } from "@/lib/motion";

export default function GallerySection(): React.ReactElement {
	const roboCupGallery = useRoboCupGallery();
	const [gallery, setGallery] = useState<RoboCupGalleryItem[]>([]);

	useEffect(() => {
		setGallery(roboCupGallery);
	}, [roboCupGallery]);

	return (
		<div className="relative w-full overflow-hidden bg-gradient-to-b from-background via-background/50 to-background px-4 py-20 sm:-mt-12 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<motion.div
					variants={textVariant()}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="mb-16 text-center">
					<h2 className="text-5xl font-black uppercase text-foreground/90 xs:text-6xl sm:text-7xl">
						Gallery
						<br />
						<span className="text-primary">Moments</span>
					</h2>
					<p className="mt-4 text-lg text-foreground/60">Experience RoboCup@Work through our lens</p>
				</motion.div>

				<div className="grid gap-8 md:grid-cols-3">
					{gallery.map((item, idx) => (
						<motion.div
							key={idx}
							variants={fadeIn("up", "spring", idx * 0.15, 0.75)}
							initial="hidden"
							whileInView="show"
							viewport={{ once: true }}
							className="group relative overflow-hidden rounded-2xl bg-muted/30 shadow-lg transition-all duration-300 hover:shadow-2xl">
							<div className="relative flex h-80 items-center justify-center overflow-hidden">
								<Image
									src={item.image}
									alt={item.title}
									width={400}
									height={320}
									className="object-contain transition-transform duration-500 group-hover:scale-110"
									sizes="(max-width: 768px) 100vw, 33vw"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							</div>

							<div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-black to-transparent px-6 py-4 transition-transform duration-300 group-hover:translate-y-0">
								<p className="text-center font-semibold text-white">{item.caption}</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	);
}
