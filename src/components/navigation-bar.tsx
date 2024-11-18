"use client"

import { Button } from "@/components/ui/button"
import { useIsIOS, useIsIpad } from "@/lib/mobile"
import { cn } from "@/lib/utils"
import { useVirtualKeyboardVisibility } from "@/lib/virtual-keyboard"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavigationBar = () => {
	const isKeyboardVisible = useVirtualKeyboardVisibility()
	const isIOS = useIsIOS()
	const isIpad = useIsIpad()
	const pathname = usePathname()

	if (isKeyboardVisible && !isIpad) return null

	return (
		<nav
			className={cn(
				"fixed",
				"bg-white",
				"bottom-0",
				["w-full", isIOS && !isIpad ? ["h-[164px]", "pb-6"] : "h-[144px]"],
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
			<Button variant={pathname === "/multi-select" ? "default" : "outline"} className={cn("col-span-2")} asChild>
				<Link href={"/multi-select"}>Multi Select</Link>
			</Button>
		</nav>
	)
}
