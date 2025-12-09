"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import React, { useRef } from "react";
import { HiMenu } from "react-icons/hi";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";

import ThemeToggleButton from "./ThemeToggle";
import { buttonVariants } from "./ui/button";

export default function Navbar(): React.JSX.Element {
	const router = useRouter();
	const [logo, setLogo] = React.useState("/logo_light.png");
	const { resolvedTheme } = useTheme();
	const navBarRef = useRef<HTMLDivElement>(null);
	React.useEffect(() => {
		const handleScroll = (): void => {
			if (navBarRef.current) {
				if (window.scrollY > 0) {
					// navBarRef.current.classList.remove("bg-background");
					navBarRef.current.classList.add("backdrop-blur-lg");
				} else {
					navBarRef.current.classList.remove("backdrop-blur-lg");
					// navBarRef.current.classList.add("bg-background");
				}
			}
		};
		window.addEventListener("scroll", handleScroll);
		return (): void => window.removeEventListener("scroll", handleScroll);
	}, []);

	React.useEffect(() => {
		setLogo(resolvedTheme === "dark" ? "/logo_dark.png" : "/logo_light.png");
	}, [resolvedTheme]);
	return (
		<nav
			ref={navBarRef}
			className="fixed top-0 z-20 flex w-full items-center bg-background/90 px-4 shadow-md backdrop-filter transition-all duration-300 ease-in dark:shadow-secondary/20">
			<div className="mx-auto flex w-full items-center justify-between">
				<div className="flex cursor-pointer items-center" onClick={(): void => router.push("/")}>
					<Image
						src={logo}
						alt="RoboManipal Logo"
						width={40}
						height={40}
						className="h-[72px] w-full rounded-full"
					/>
				</div>
				<div className="hidden items-center gap-3 md:flex">
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="text-md">About Us</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
										<li className="row-span-3">
											<NavigationMenuLink asChild>
												<a
													className="flex h-full w-full select-none flex-col items-center justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 text-center no-underline outline-none focus:shadow-md"
													href="/">
													<Image
														src="/icons/icon-384x384.png"
														alt="RoboManipal Logo"
														width={96}
														height={96}
														className="mb-4 h-24 w-24 rounded-full shadow-sm"
													/>
													<div className="mb-2 text-lg font-medium">RoboManipal</div>
													<p className="text-pretty text-xs text-muted-foreground">
														A student project dedicated to the robotics and automation.
													</p>
												</a>
											</NavigationMenuLink>
										</li>
										<ListItem href="/#about" title="About us">
											Learn about the project and its goals.
										</ListItem>
										<ListItem href="/#sponsors" title="Sponsors">
											See who's supporting us and our causes.
										</ListItem>
										<ListItem href="/#contact" title="Contact">
											Reach out with any questions or feedback.
										</ListItem>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							{navLinks.map((link) => {
								if (link.label === "Team") {
									return (
										<div key={link.label} className="relative">
											<button
												className={cn(
													navigationMenuTriggerStyle(),
													"text-md peer flex items-center"
												)}>
												Team
												<ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 peer-hover:rotate-180" />
											</button>
											<div className="invisible absolute right-0 top-full z-50 mt-1 w-[280px] rounded-md border bg-popover p-4 text-popover-foreground opacity-0 shadow-lg transition-all duration-200 peer-hover:visible peer-hover:opacity-100 hover:visible hover:opacity-100">
												<div className="grid gap-3">
													<a
														href="/team/current"
														className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
														<div className="text-sm font-medium leading-none">
															Current Team
														</div>
														<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
															Meet our current team members.
														</p>
													</a>
													<a
														href="/team/alumni"
														className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
														<div className="text-sm font-medium leading-none">Alumni</div>
														<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
															Meet our alumni from previous batches.
														</p>
													</a>
												</div>
											</div>
										</div>
									);
								}
								return (
									<NavigationMenuItem key={link.label}>
										<NavigationMenuLink
											href={link.route}
											className={cn(navigationMenuTriggerStyle(), "text-md cursor-pointer")}>
											{link.label}
										</NavigationMenuLink>
									</NavigationMenuItem>
								);
							})}
						</NavigationMenuList>
					</NavigationMenu>
					<ThemeToggleButton />
				</div>
				<div className="flex items-center gap-4 md:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<HiMenu className="cursor-pointer text-3xl" />
						</SheetTrigger>
						<SheetContent>
							<SheetHeader className="mt-10">
								<SheetTitle>Menu</SheetTitle>
							</SheetHeader>
							<div className="mt-10 flex flex-col gap-4">
								{navLinks.map((link) => (
									<Link
										href={link.route}
										key={link.label}
										className={cn(
											buttonVariants({ variant: "ghost" }),
											"group relative flex h-12 cursor-pointer justify-start"
										)}>
										<link.icon className={cn("h-5 w-5", link.color)} />
										<span className="absolute left-12 text-base duration-200">{link.label}</span>
									</Link>
								))}
							</div>
						</SheetContent>
					</Sheet>
					<ThemeToggleButton />
				</div>
			</div>
		</nav>
	);
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
							className
						)}
						{...props}>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = "ListItem";
