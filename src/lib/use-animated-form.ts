import { useIsMobile } from "@/lib/is-mobile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { type DefaultValues, type FieldValues, type Path, useForm } from "react-hook-form"
import type { ZodType, ZodTypeDef } from "zod"

export const useAnimatedForm = <Schema extends ZodType<Output, ZodTypeDef, Input>, Output extends FieldValues, Input>(
	schema: Schema,
	defaultValues: DefaultValues<Output>,
	onSubmit: (values: Output) => void
) => {
	const animationDuration = 0.4
	const animationDurationMs = animationDuration * 1000

	const isMobile = useIsMobile()
	const [focusedField, setFocusedField] = useState<Path<Output> | null>(null)
	const [readOnly, setReadOnly] = useState(true)
	const dummyInputRef = useRef<HTMLTextAreaElement | null>(null)

	const form = useForm<Output>({
		resolver: zodResolver(schema),
		defaultValues
	})

	const handleFocus = (field: Path<Output>) => {
		if (!isMobile) {
			form.setFocus(field)
			return
		}

		if (focusedField !== field) {
			setFocusedField(field)
			setReadOnly(false)

			form.setFocus(field)

			if (dummyInputRef.current) dummyInputRef.current.focus()

			setTimeout(() => {
				form.setFocus(field)
			}, animationDurationMs)
		}
	}

	const handleBlur = (onBlur: () => void) => {
		if (!readOnly) {
			setReadOnly(true)
			setFocusedField(null)
		}
		onBlur()
	}

	return {
		form,
		isMobile,
		isDisabled: (field: Path<Output>) => isMobile && focusedField !== null && focusedField !== field,
		focusedField,
		readOnly: isMobile && readOnly,
		handleFocus,
		handleBlur,
		setReadOnly,
		dummyInputRef,
		handleSubmit: form.handleSubmit(onSubmit),
		animationDuration
	}
}
