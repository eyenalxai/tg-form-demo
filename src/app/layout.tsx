import "./globals.css"
import { NavButtons } from "@/components/nav-buttons"
import { Providers } from "@/components/providers"
import { StickyApp } from "@/components/sticky-app"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import type { Metadata, Viewport } from "next"
import Link from "next/link"
import type { ReactNode } from "react"

const TITLE = "Test Form"
const DESCRIPTION = "Form demos in Telegram Mini Apps"

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	openGraph: {
		title: TITLE,
		description: DESCRIPTION,
		type: "website"
	}
}

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "0 0% 100%" },
		{ media: "(prefers-color-scheme: dark)", color: "222.2 84% 4.9%" }
	]
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn("font-sans", "antialiased", GeistSans.variable, GeistMono.variable, "mobile-body")}>
				<Providers attribute="class" defaultTheme="system" enableSystem>
					<StickyApp>
						<div className={cn("container", "max-w-xs", "mx-auto", "mb-12")}>
							<NavButtons />
							<Separator className={cn("my-4")} />
							{children}
						</div>
					</StickyApp>
				</Providers>
			</body>
		</html>
	)
}
