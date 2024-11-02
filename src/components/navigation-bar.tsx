"use client"

import { Button } from "@/components/ui/button"
import { useIsIpad } from "@/lib/is-mobile"
import { cn } from "@/lib/utils"
import { useVirtualKeyboardVisibility } from "@/lib/virtual-keyboard"
import { useLaunchParams } from "@telegram-apps/sdk-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavigationBar = () => {
	const isKeyboardVisible = useVirtualKeyboardVisibility()
	const launchParams = useLaunchParams(true)
	const isIOS = launchParams?.platform === "ios"
	const isIpad = useIsIpad()

	const pathname = usePathname()

	if (isKeyboardVisible && !isIpad) return null

	return (
		<nav
			className={cn(
				"fixed",
				"bg-white",
				"bottom-0",
				["w-full", isIOS && !isIpad ? ["h-[124px]", "pb-6"] : "h-[104px]"],
				"grid",
				"grid-cols-2",
				"gap-2",
				["content-center"],
				"px-6",
				"border-t",
				"border-cloud",
				"z-90"
			)}
		>
			<Button variant={pathname === "/default" ? "default" : "outline"} asChild>
				<Link href={"/default"}>Default</Link>
			</Button>
			<Button variant={pathname === "/dialog" ? "default" : "outline"} asChild>
				<Link href={"/dialog"}>Dialog</Link>
			</Button>
			<Button variant={pathname === "/animated-single" ? "default" : "outline"} asChild>
				<Link href={"/animated-single"}>Animated Single</Link>
			</Button>
			<Button variant={pathname === "/animated-multi" ? "default" : "outline"} asChild>
				<Link href={"/animated-multi"}>Animated Multi</Link>
			</Button>
		</nav>
	)
}
