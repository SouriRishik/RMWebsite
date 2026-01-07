"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import React from "react";
import { RecoilRoot } from "recoil";

export default function AppProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
	return (
		<RecoilRoot>
			<ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem={false}>
				{children}
				<Analytics />
				<SpeedInsights />
			</ThemeProvider>
		</RecoilRoot>
	);
}
