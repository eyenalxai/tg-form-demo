"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export const StickyApp = ({ children }: { children: ReactNode }) => {
	return <div className={cn("container", "max-w-sm", "mx-auto", "px-2", "mt-2", "mb-24")}>{children}</div>
}
