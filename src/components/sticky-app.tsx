"use client"

import { cn } from "@/lib/utils"
import { useSwipeBehavior } from "@telegram-apps/sdk-react"
import { type ReactNode, useEffect, useState } from "react"

export const StickyApp = ({ children }: { children: ReactNode }) => {
	const swipeBehavior = useSwipeBehavior(true)

	useEffect(() => {
		if (swipeBehavior === undefined) return

		swipeBehavior.disableVerticalSwipe()
	}, [swipeBehavior])

	return <div className={cn("container", "max-w-sm", "mx-auto")}>{children}</div>
}
