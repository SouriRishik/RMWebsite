"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop(): React.ReactElement {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	// Show button when page is scrolled down
	useEffect(() => {
		const toggleVisibility = (): void => {
			if (window.scrollY > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);

		return (): void => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	const scrollToTop = (): void => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<Button
			className={cn(
				"fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full p-0 shadow-lg transition-all duration-300 hover:scale-110",
				isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
			)}
			onClick={scrollToTop}
			size="icon"
			aria-label="Scroll to top">
			<ArrowUp className="h-5 w-5" />
		</Button>
	);
}
