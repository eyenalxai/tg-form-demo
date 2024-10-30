"use client"

import { StickyApp } from "@/components/sticky-app"
import { useMiniApp, useViewport } from "@telegram-apps/sdk-react"
import { type ReactNode, useEffect } from "react"

type EntrypointProps = {
	children: ReactNode
}

export const Entrypoint = ({ children }: EntrypointProps) => {
	const miniApp = useMiniApp(true)
	const viewPort = useViewport(true)

	useEffect(() => {
		if (miniApp == null || viewPort == null) {
			console.info("either miniApp or viewPort is null")
			return
		}

		miniApp.ready()
		viewPort.expand()
		miniApp.setHeaderColor("#FFFFFF")
		miniApp.setBgColor("#FFFFFF")
	}, [miniApp, viewPort])

	return <StickyApp>{children}</StickyApp>
}
