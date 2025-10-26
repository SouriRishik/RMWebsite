"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ScrollToTop(): React.ReactElement {
	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		const SENTINEL_ID = "rm-scroll-top-sentinel";
		let created = false;

		let sentinel = document.getElementById(SENTINEL_ID) as HTMLElement | null;
		if (!sentinel) {
			sentinel = document.createElement("div");
			sentinel.id = SENTINEL_ID;
			sentinel.style.position = "absolute";
			sentinel.style.top = "0px";
			sentinel.style.left = "0px";
			sentinel.style.width = "1px";
			sentinel.style.height = "1px";
			sentinel.style.pointerEvents = "none";
			sentinel.style.zIndex = "-1";
			document.body.prepend(sentinel);
			created = true;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const e = entries[0];
				setIsVisible(!e.isIntersecting);
			},
			{
				root: null,
				threshold: 0,
			}
		);

		observer.observe(sentinel);

		return (): void => {
			observer.disconnect();
			if (created && sentinel && sentinel.parentElement) {
				sentinel.parentElement.removeChild(sentinel);
			}
		};
	}, []);

	const scrollToTop = (): void => {
		window.scrollTo({ top: 0, behavior: "smooth" });
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
