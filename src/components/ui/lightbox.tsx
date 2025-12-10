"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import React from "react";

import { GalleryItem } from "@/lib/models";
import { cn } from "@/lib/utils";

import { Button } from "./button";

interface LightboxProps {
	isOpen: boolean;
	items: GalleryItem[];
	currentIndex: number;
	onClose: () => void;
	onNext: () => void;
	onPrev: () => void;
}

export function Lightbox({
	isOpen,
	items,
	currentIndex,
	onClose,
	onNext,
	onPrev,
}: LightboxProps): React.ReactElement | null {
	if (!isOpen || !items[currentIndex]) return null;

	const currentItem = items[currentIndex];

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-label="Image lightbox">
			<Button
				onClick={onClose}
				variant="ghost"
				size="icon"
				className="absolute right-4 top-4 text-white hover:bg-white/20"
				aria-label="Close lightbox">
				<X className="h-6 w-6" />
			</Button>
			<div
				className="relative flex h-full max-h-[90vh] w-full max-w-[90vw] items-center justify-center"
				onClick={(e): void => e.stopPropagation()}>
				<Image
					src={currentItem.image as string}
					alt={currentItem.title}
					fill
					className="object-contain"
					sizes="(max-width: 768px) 90vw, 85vw"
					priority
				/>
				<div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
					<p className="text-center text-lg font-semibold">{currentItem.title}</p>
					<p className="text-center text-sm text-gray-300">
						{currentIndex + 1} / {items.length}
					</p>
				</div>
				{items.length > 1 && (
					<>
						<Button
							onClick={(e): void => {
								e.stopPropagation();
								onPrev();
							}}
							variant="ghost"
							size="icon"
							className={cn(
								"absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20",
								currentIndex === 0 && "cursor-not-allowed opacity-50"
							)}
							disabled={currentIndex === 0}
							aria-label="Previous image">
							<ChevronLeft className="h-6 w-6" />
						</Button>
						<Button
							onClick={(e): void => {
								e.stopPropagation();
								onNext();
							}}
							variant="ghost"
							size="icon"
							className={cn(
								"absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20",
								currentIndex === items.length - 1 && "cursor-not-allowed opacity-50"
							)}
							disabled={currentIndex === items.length - 1}
							aria-label="Next image">
							<ChevronRight className="h-6 w-6" />
						</Button>
					</>
				)}
			</div>
			<LightboxKeyboard onClose={onClose} onNext={onNext} onPrev={onPrev} />
		</div>
	);
}

function LightboxKeyboard({
	onClose,
	onNext,
	onPrev,
}: {
	onClose: () => void;
	onNext: () => void;
	onPrev: () => void;
}): null {
	React.useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent): void => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") onNext();
			if (e.key === "ArrowLeft") onPrev();
		};

		window.addEventListener("keydown", handleKeyDown);
		return (): void => window.removeEventListener("keydown", handleKeyDown);
	}, [onClose, onNext, onPrev]);

	return null;
}
