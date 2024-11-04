import { useIsMobile } from "@/lib/is-mobile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { type DefaultValues, type FieldValues, type Path, type PathValue, useForm } from "react-hook-form"
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

	type HandleFocusOptions = {
		focusHackDefaultValue: PathValue<Output, Path<Output>>
	}

	const handleFocus = (field: Path<Output>, options?: HandleFocusOptions) => {
		if (!isMobile) {
			form.setFocus(field)
			return
		}

		const currentValue = form.getValues(field)

		if (options) {
			form.setValue(field, options.focusHackDefaultValue)
		}

		setTimeout(() => {
			if (focusedField !== field) {
				setFocusedField(field)
				setReadOnly(false)

				if (dummyInputRef.current) dummyInputRef.current.focus()

				setTimeout(() => {
					form.setFocus(field)
					setTimeout(() => {
						form.setValue(field, currentValue)
					}, animationDurationMs * 0.1)
				}, animationDurationMs * 0.9)
			}
		}, 50)
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
