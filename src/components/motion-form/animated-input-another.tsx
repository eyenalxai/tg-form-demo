import { Input } from "@/components/ui/input"
import type { FormSchema } from "@/lib/form"
import { useIsMobile } from "@/lib/is-mobile"
import { cn } from "@/lib/utils"
import {
	type Dispatch,
	type InputHTMLAttributes,
	type RefObject,
	type SetStateAction,
	forwardRef,
	useEffect,
	useState
} from "react"
import type { z } from "zod"

export interface AnimatedInputAnotherProps extends InputHTMLAttributes<HTMLInputElement> {
	isFocused: boolean
	setFocusedField: Dispatch<SetStateAction<keyof z.infer<typeof FormSchema> | null>>
	name: keyof z.infer<typeof FormSchema>
	setFocus: (field: keyof z.infer<typeof FormSchema>) => void
	dummyInputRef: RefObject<HTMLTextAreaElement | null>
}

const AnimatedInputAnother = forwardRef<HTMLInputElement, AnimatedInputAnotherProps>(
	({ className, type, isFocused, setFocusedField, name, setFocus, dummyInputRef, ...props }, ref) => {
		const isMobile = useIsMobile()
		const [isReadOnly, setIsReadOnly] = useState(true)

		useEffect(() => {
			if (isFocused) {
				setIsReadOnly(false)

				if (!isMobile) {
					setFocus(name)
					return
				}

				if (dummyInputRef.current) dummyInputRef.current.focus()

				const timeoutId = setTimeout(() => {
					setFocus(name)
				}, 300)

				return () => {
					clearTimeout(timeoutId)
				}
			}
		}, [isMobile, isFocused, name, setFocus, dummyInputRef])

		return (
			<Input
				type={type}
				readOnly={isMobile && isReadOnly}
				onFocus={() => setFocusedField(name)}
				onBlur={() => {
					if (!isReadOnly) {
						setIsReadOnly(true)
						setFocusedField(null)
					}
				}}
				className={cn(className)}
				ref={ref}
				{...props}
			/>
		)
	}
)
AnimatedInputAnother.displayName = "AnimatedInput2"

export { AnimatedInputAnother }
