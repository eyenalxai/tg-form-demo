"use client"

import { type Platform, useLaunchParams } from "@telegram-apps/sdk-react"
import { useEffect, useState } from "react"

export const useIsMobile = () => {
	const launchParams = useLaunchParams(true)

	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		if (launchParams === undefined) return

		const nonMobilePlatforms = ["macos", "tdesktop", "weba", "web", "webk"] as Platform[]

		setIsMobile(!nonMobilePlatforms.includes(launchParams.platform))
	}, [launchParams])

	return isMobile
}

export const useIsIOS = () => {
	const launchParams = useLaunchParams(true)

	const [isIOS, setIsIOS] = useState(false)

	useEffect(() => {
		if (launchParams === undefined) return

		setIsIOS(launchParams.platform === "ios")
	}, [launchParams])

	return isIOS
}

export const useIsAndroid = () => {
	const launchParams = useLaunchParams(true)

	const [isAndroid, setIsAndroid] = useState(false)

	useEffect(() => {
		if (launchParams === undefined) return

		setIsAndroid(launchParams.platform === "android")
	}, [launchParams])

	return isAndroid
}
