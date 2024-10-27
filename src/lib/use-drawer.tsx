import { type Dispatch, type ReactNode, type SetStateAction, createContext, useContext, useState } from "react"

export type DrawerContentType = {
	body: ReactNode
}

export const DrawerContext = createContext<
	| {
			isOpen: boolean
			setIsOpen: Dispatch<SetStateAction<boolean>>
	  }
	| undefined
>(undefined)

type DrawerContextProviderProps = {
	children: ReactNode
}

export const DrawerContextProvider = ({ children }: DrawerContextProviderProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<DrawerContext.Provider
			value={{
				isOpen,
				setIsOpen
			}}
		>
			{children}
		</DrawerContext.Provider>
	)
}

export const useDrawer = () => {
	const context = useContext(DrawerContext)
	if (context === undefined) {
		throw new Error("useDrawer must be used within a DrawerContextProvider")
	}
	return context
}
