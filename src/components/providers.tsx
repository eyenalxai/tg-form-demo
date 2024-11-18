"use client"

import { DrawerContextProvider } from "@/lib/drawer"
import { SDKProvider } from "@telegram-apps/sdk-react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function Providers({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			<SDKProvider acceptCustomStyles>
				<DrawerContextProvider>{children}</DrawerContextProvider>
			</SDKProvider>
		</NextThemesProvider>
	)
}
