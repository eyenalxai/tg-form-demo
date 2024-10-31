import { useIsAndroid, useIsIOS, useIsMobile } from "@/lib/is-mobile"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { type ReactNode, useEffect, useRef, useState } from "react"

type AnimatedContainerProps = {
	children: ReactNode
	isMoved: boolean
	anotherMoved?: boolean
	className?: string
}

export const AnimatedContainer = ({ children, isMoved, anotherMoved, className }: AnimatedContainerProps) => {
	const [zIndex, setZIndex] = useState(0)
	const [targetY, setTargetY] = useState(0)

	const isMobile = useIsMobile()
	const isAndroid = useIsAndroid()
	const isIOS = useIsIOS()

	const elementRef = useRef<HTMLDivElement>(null)

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

	useEffect(() => {
		const calculatePosition = () => {
			if (elementRef.current) {
				const elementRect = elementRef.current.getBoundingClientRect()
				const viewportOffset = 100
				const currentOffset = elementRect.top
				setTargetY(viewportOffset - currentOffset)
			}
		}

		const timeoutId = setTimeout(() => {
			calculatePosition()
		}, 100)

		const mainWrapper = document.getElementById("main-wrapper")

		if (mainWrapper) {
			mainWrapper.addEventListener("scroll", calculatePosition)
		}

		return () => {
			if (mainWrapper) {
				mainWrapper.removeEventListener("scroll", calculatePosition)
			}

			clearTimeout(timeoutId)
		}
	}, [])

	if (!isMobile) return children

	return (
		<motion.div
			ref={elementRef}
			layout={"position"}
			className={cn(className)}
			animate={{ y: isMoved && isAndroid ? targetY : 0 }}
			style={{
				position: isMoved && isIOS ? "fixed" : "static",
				top: isMoved && isIOS ? "6rem" : "auto",
				width: isMoved && isIOS ? "calc(100% - 2rem)" : "100%",
				left: isMoved && isIOS ? "1rem" : "auto",
				right: isMoved && isIOS ? "1rem" : "auto",
				zIndex: zIndex,
				borderRadius: isMoved ? "var(--radius)" : 0
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
