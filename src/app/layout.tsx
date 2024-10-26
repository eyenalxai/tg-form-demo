import "./globals.css"
import { Entrypoint } from "@/components/entrypoint"
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
			<body className={cn("font-sans", "antialiased", GeistSans.variable, GeistMono.variable)}>
				<textarea id={"dummy-input"} className={cn("size-px", "absolute", "bg-transparent", "pointer-events-none")} />
				<Providers attribute="class" defaultTheme="light">
					<Entrypoint>
						<NavButtons />
						<Separator className={cn("my-4")} />
						{children}
					</Entrypoint>
				</Providers>
			</body>
		</html>
	)
}
