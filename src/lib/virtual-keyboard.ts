"use client"

import { useIsIpad, useIsMobile } from "@/lib/mobile"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"

const isKeyboardInput = (elem: HTMLElement) =>
	((elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") &&
		!["button", "submit", "checkbox", "file", "image"].includes((elem as HTMLInputElement).type)) ||
	elem.hasAttribute("contenteditable")

const isButton = (elem: HTMLElement) => elem.tagName === "BUTTON"

export const useVirtualKeyboardVisibility = () => {
	const isIpad = useIsIpad()

	const [isVisible, setIsVisible] = useState(false)
	const isMobile = useIsMobile()

	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const handleFocusIn = (e: FocusEvent) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
				timeoutRef.current = null
			}
			if (e.target) {
				const target = e.target as HTMLElement

				if (isButton(target)) {
					timeoutRef.current = setTimeout(() => setIsVisible(false), 100)
					return
				}

				if (isKeyboardInput(target)) {
					setIsVisible(true)
				}
			}
		}

		const handleFocusOut = (e: FocusEvent) => {
			if (e.target) {
				const target = e.target as HTMLElement
				if (isKeyboardInput(target)) {
					timeoutRef.current = setTimeout(() => setIsVisible(false), 100)
				}
			}
		}

		document.addEventListener("focusin", handleFocusIn)
		document.addEventListener("focusout", handleFocusOut)

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
			document.removeEventListener("focusin", handleFocusIn)
			document.removeEventListener("focusout", handleFocusOut)
		}
	}, [])

	const subscribe = (onStoreChange: () => void) => {
		document.addEventListener("focusin", onStoreChange)
		document.addEventListener("focusout", onStoreChange)
		return () => {
			document.removeEventListener("focusin", onStoreChange)
			document.removeEventListener("focusout", onStoreChange)
		}
	}

	const getSnapshot = () => isVisible && isMobile && !isIpad

	// Assume always false for server rendering context
	const getServerSnapshot = () => false

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
