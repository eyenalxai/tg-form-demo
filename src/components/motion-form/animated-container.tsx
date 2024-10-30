import { useIsMobile } from "@/lib/is-mobile"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { type ReactNode, useEffect, useState } from "react"

type AnimatedContainerProps = {
	children: ReactNode
	isMoved: boolean
	anotherMoved?: boolean
	className?: string
}

export const AnimatedContainer = ({ children, isMoved, anotherMoved, className }: AnimatedContainerProps) => {
	const [zIndex, setZIndex] = useState(0)
	const isMobile = useIsMobile()

	useEffect(() => {
		if (!isMobile) return

		if (isMoved) {
			setZIndex(50)
			return
		}

		const timeoutId = setTimeout(() => {
			setZIndex(0)
		}, 300)

		return () => clearTimeout(timeoutId)
	}, [isMoved, isMobile])

	if (!isMobile) return children

	return (
		<motion.div
			layout={"position"}
			className={cn(className)}
			style={{
				position: isMoved ? "fixed" : "static",
				top: isMoved ? "6rem" : "auto",
				width: isMoved ? "calc(100% - 2rem)" : "100%",
				left: isMoved ? "1rem" : "auto",
				right: isMoved ? "1rem" : "auto",
				zIndex: zIndex,
				borderRadius: isMoved ? "var(--radius)" : 0
			}}
			transition={{
				type: "spring",
				duration: 0.4,
				bounce: 0.1
			}}
		>
			<div
				className={cn(
					["transition-all", "duration-200", "ease-in-out"],
					anotherMoved && ["opacity-50", "blur-[2px]"],
					isMoved && ["p-4", "pt-2", "shadow-elevated", "rounded-md"]
				)}
			>
				{children}
			</div>
		</motion.div>
	)
}
