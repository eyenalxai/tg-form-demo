"use client"

import { DrawerContextProvider } from "@/lib/use-drawer"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes/dist/types"

export function Providers({ children, ...props }: ThemeProviderProps) {
	return (
		<NextThemesProvider {...props}>
			<DrawerContextProvider>{children}</DrawerContextProvider>
		</NextThemesProvider>
	)
}
