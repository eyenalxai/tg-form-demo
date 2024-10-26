"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavButtons = () => {
	const pathname = usePathname()

	return (
		<div className={cn("grid", "grid-cols-2", "gap-2")}>
			<Button variant={pathname === "/default" ? "default" : "outline"} asChild>
				<Link href={"/default"}>Default</Link>
			</Button>
			<Button variant={pathname === "/dialog" ? "default" : "outline"} asChild>
				<Link href={"/dialog"}>Dialog</Link>
			</Button>
			<Button variant={pathname === "/animate" ? "default" : "outline"} className={"col-span-2"} asChild>
				<Link href={"/animate"}>Animate</Link>
			</Button>
		</div>
	)
}
