import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export const StickyApp = ({ children }: { children: ReactNode }) => {
	return (
		<main className={cn("fixed", "left-0", "top-0", "right-0", "bottom-0", "overflow-x-hidden", "overflow-y-auto")}>
			<div className={cn("h-[calc(100% + 1px)]")}>
				<div className={cn("flex", "justify-center", "items-center", "p-4", "pt-1", "h-fit")}>{children}</div>
			</div>
		</main>
	)
}
