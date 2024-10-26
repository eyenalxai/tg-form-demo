"use client"

import { type Platform, useLaunchParams } from "@telegram-apps/sdk-react"
import { useEffect, useState, useSyncExternalStore } from "react"

const isKeyboardInput = (elem: HTMLElement) =>
	((elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") &&
		!["button", "submit", "checkbox", "file", "image"].includes(
			(elem as HTMLInputElement).type
		)) ||
	elem.hasAttribute("contenteditable")

export const useVirtualKeyboardVisibility = () => {
	const launchParams = useLaunchParams(true)

	const [isVisible, setIsVisible] = useState(false)
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		if (launchParams === undefined) return

		const nonMobilePlatforms = [
			"macos",
			"tdesktop",
			"weba",
			"web",
			"webk"
		] as Platform[]

		setIsMobile(!nonMobilePlatforms.includes(launchParams.platform))
	}, [launchParams])

	useEffect(() => {
		const handleFocusIn = (e: FocusEvent) => {
			if (e.target) {
				const target = e.target as HTMLElement
				if (isKeyboardInput(target)) {
					setIsVisible(true)
				}
			}
		}
		const handleFocusOut = (e: FocusEvent) => {
			if (e.target) {
				const target = e.target as HTMLElement
				if (isKeyboardInput(target)) {
					setIsVisible(false)
				}
			}
		}
		document.addEventListener("focusin", handleFocusIn)
		document.addEventListener("focusout", handleFocusOut)

		return () => {
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

	const getSnapshot = () => isVisible && isMobile

	// Assume always false for server rendering context
	const getServerSnapshot = () => false

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
