import { Input } from "@/components/ui/input"
import type { FormSchema } from "@/lib/form"

import { type RefObject, useEffect, useState } from "react"
import { type Control, useController } from "react-hook-form"
import type { z } from "zod"

type AnimatedInputProps = {
	focusedField: keyof z.infer<typeof FormSchema> | null
	name: keyof z.infer<typeof FormSchema>
	control: Control<z.infer<typeof FormSchema>>
	handleFocus: (field: keyof z.infer<typeof FormSchema>) => void
	handleBlur: (onBlur: () => void) => void
	setFocus: (field: keyof z.infer<typeof FormSchema>) => void
	dummyInputRef: RefObject<HTMLTextAreaElement | null>
}

export const AnimatedInput = ({
	focusedField,
	name,
	control,
	handleFocus,
	handleBlur,
	setFocus,
	dummyInputRef
}: AnimatedInputProps) => {
	const [isReadOnly, setIsReadOnly] = useState(true)

	const {
		field: { onBlur, ...field }
	} = useController({
		name,
		control
	})

	useEffect(() => {
		if (focusedField === name) {
			setIsReadOnly(false)

			if (dummyInputRef.current) dummyInputRef.current.focus()

			const timeoutId = setTimeout(() => {
				setFocus(name)
			}, 300)

			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [focusedField, name, setFocus, dummyInputRef])

	return (
		<Input
			readOnly={isReadOnly}
			disabled={focusedField !== null && focusedField !== name}
			onFocus={() => handleFocus(field.name)}
			onBlur={() => {
				if (!isReadOnly) {
					setIsReadOnly(true)
					handleBlur(onBlur)
				}
			}}
			placeholder={field.name}
			{...field}
		/>
	)
}
