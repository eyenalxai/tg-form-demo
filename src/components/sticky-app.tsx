"use client"

import { NavigationBar } from "@/components/navigation-bar"
import { useIsMobile } from "@/lib/is-mobile"
import { cn } from "@/lib/utils"
import { useVirtualKeyboardVisibility } from "@/lib/virtual-keyboard"
import { useSwipeBehavior } from "@telegram-apps/sdk-react"
import { type ReactNode, useEffect } from "react"

export const StickyApp = ({ children }: { children: ReactNode }) => {
	const isMobile = useIsMobile()
	const swipeBehavior = useSwipeBehavior(true)
	const isKeyboardVisible = useVirtualKeyboardVisibility()

	useEffect(() => {
		if (isMobile) document.body.classList.add("mobile-body")
	}, [isMobile])

	useEffect(() => {
		if (swipeBehavior === undefined) return

		swipeBehavior.disableVerticalSwipe()
	}, [swipeBehavior])

	return (
		<main
			id={"main-wrapper"}
			className={cn(
				isMobile && [
					"fixed",
					"left-0",
					"top-0",
					"right-0",
					"bottom-0",
					"overflow-x-hidden",
					isKeyboardVisible ? "overflow-y-hidden" : "overflow-y-auto"
				]
			)}
		>
			<div className={cn(isMobile && "h-[calc(100% + 1px)]")}>
				<div className={cn("container", "max-w-sm", "mx-auto", "px-2", "mt-2", "mb-48")}>{children}</div>
				<NavigationBar />
			</div>
		</main>
	)
}
