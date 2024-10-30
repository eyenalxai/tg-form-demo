import { Input } from "@/components/ui/input"
import type { FormSchema } from "@/lib/form"

import { useEffect, useState } from "react"
import { type Control, useController } from "react-hook-form"
import type { z } from "zod"

type AnimatedInputProps = {
	focusedField: keyof z.infer<typeof FormSchema> | null
	name: keyof z.infer<typeof FormSchema>
	control: Control<z.infer<typeof FormSchema>>
	handleFocus: (field: keyof z.infer<typeof FormSchema>) => void
	handleBlur: (onBlur: () => void) => void
	setFocus: (field: keyof z.infer<typeof FormSchema>) => void
}

export const AnimatedInput = ({
	focusedField,
	name,
	control,
	handleFocus,
	handleBlur,
	setFocus
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
			const dummyInput = document.getElementById("dummy-input")
			if (dummyInput) {
				dummyInput.focus()
			}

			const timeoutId = setTimeout(() => {
				setFocus(name)
			}, 300)

			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [focusedField, name, setFocus])

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
