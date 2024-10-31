"use client"

import { Button } from "@/components/ui/button"
import { useIsIpad } from "@/lib/is-mobile"
import { cn } from "@/lib/utils"
import { useVirtualKeyboardVisibility } from "@/lib/virtual-keyboard"
import { useLaunchParams } from "@telegram-apps/sdk-react"

export const NavigationBar = () => {
	const isKeyboardVisible = useVirtualKeyboardVisibility()
	const launchParams = useLaunchParams(true)
	const isIOS = launchParams?.platform === "ios"
	const isIpad = useIsIpad()

	if (isKeyboardVisible && !isIpad) return null

	return (
		<nav
			className={cn(
				"fixed",
				"bg-white",
				"bottom-0",
				["w-full", isIOS && !isIpad ? "h-[84px]" : "h-[64px]"],
				"flex",
				["justify-between", "items-center"],
				"px-6",
				"border-t",
				"border-cloud",
				"z-90"
			)}
		>
			<Button variant={"outline"}>One</Button>
			<Button variant={"outline"}>Two</Button>
			<Button variant={"outline"}>Three</Button>
			<Button variant={"outline"}>Four</Button>
		</nav>
	)
}
