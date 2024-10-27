"use client"

import { useEffect, useState } from "react"

export const useIsScrolling = () => {
	const [isScrolling, setIsScrolling] = useState(false)

	useEffect(() => {
		let timeoutId: ReturnType<typeof setTimeout>

		const handleScroll = () => {
			setIsScrolling(true)

			clearTimeout(timeoutId)
			timeoutId = setTimeout(() => {
				setIsScrolling(false)
			}, 50)
		}

		window.addEventListener("scroll", handleScroll)

		return () => {
			window.removeEventListener("scroll", handleScroll)
			clearTimeout(timeoutId)
		}
	}, [])

	return isScrolling
}
