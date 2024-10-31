"use client"

import { NavigationBar } from "@/components/navigation-bar"
import { useIsIpad } from "@/lib/is-mobile"
import { cn } from "@/lib/utils"
import { useVirtualKeyboardVisibility } from "@/lib/virtual-keyboard"
import { type Platform, useLaunchParams, useSwipeBehavior } from "@telegram-apps/sdk-react"
import { type ReactNode, useEffect, useState } from "react"

export const StickyApp = ({ children }: { children: ReactNode }) => {
	const launchParams = useLaunchParams(true)
	const [isSticky, setIsSticky] = useState(false)
	const swipeBehavior = useSwipeBehavior(true)
	const isKeyboardVisible = useVirtualKeyboardVisibility()
	const isIpad = useIsIpad()

	useEffect(() => {
		if (isSticky) document.body.classList.add("mobile-body")
	}, [isSticky])

	useEffect(() => {
		if (launchParams === undefined) return

		const nonStickyPlatforms = ["macos", "tdesktop", "weba", "web", "webk"] as Platform[]

		setIsSticky(!nonStickyPlatforms.includes(launchParams.platform))
	}, [launchParams])

	useEffect(() => {
		if (swipeBehavior === undefined) return

		swipeBehavior.disableVerticalSwipe()
	}, [swipeBehavior])

	return (
		<main
			id={"main-wrapper"}
			className={cn(
				isSticky && [
					"fixed",
					"left-0",
					"top-0",
					"right-0",
					"bottom-0",
					"overflow-x-hidden",
					isKeyboardVisible && !isIpad ? "overflow-y-hidden" : "overflow-y-auto"
				]
			)}
		>
			<div className={cn(isSticky && "h-[calc(100% + 1px)]")}>
				<div className={cn("container", "max-w-sm", "mx-auto", "px-2", "mt-2", "mb-24")}>{children}</div>
				<NavigationBar />
			</div>
		</main>
	)
}
