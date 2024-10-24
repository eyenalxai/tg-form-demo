"use client"

import { cn } from "@/lib/utils"
import { type Platform, useLaunchParams, useSwipeBehavior } from "@telegram-apps/sdk-react"
import { type ReactNode, useEffect, useState } from "react"

export const StickyApp = ({ children }: { children: ReactNode }) => {
	const launchParams = useLaunchParams(true)
	const swipeBehavior = useSwipeBehavior(true)

	useEffect(() => {
		if (swipeBehavior === undefined) return

		swipeBehavior.disableVerticalSwipe()
	}, [swipeBehavior])

	return (
		<main className={cn(["fixed", "left-0", "top-0", "right-0", "bottom-0", "overflow-x-hidden", "overflow-y-auto"])}>
			<div className={cn("container", "max-w-sm", "mx-auto")}>{children}</div>
		</main>
	)
}
