"use client"

import { StickyApp } from "@/components/sticky-app"
import type { ReactNode } from "react"

type EntrypointProps = {
	children: ReactNode
}

export const Entrypoint = ({ children }: EntrypointProps) => {
	return <StickyApp>{children}</StickyApp>
}
