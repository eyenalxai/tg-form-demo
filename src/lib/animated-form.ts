import { useIsIOS, useIsMobile } from "@/lib/mobile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef, useState } from "react"
import { type DefaultValues, type FieldValues, type Path, type PathValue, useForm } from "react-hook-form"
import type { ZodType, ZodTypeDef } from "zod"

type UseAnimatedFormOptions = {
	iOSPreFocusStyles?: string[]
}

export const useAnimatedForm = <Schema extends ZodType<Output, ZodTypeDef, Input>, Output extends FieldValues, Input>(
	schema: Schema,
	defaultValues: DefaultValues<Output>,
	onSubmit: (values: Output) => void,
	options?: UseAnimatedFormOptions
) => {
	const iOSFocusDelay = 25

	const animationDuration = 0.4 + iOSFocusDelay / 1000
	const animationDurationMs = animationDuration * 1000

	const isMobile = useIsMobile()
	const isIOS = useIsIOS()

	const [focusedField, setFocusedField] = useState<Path<Output> | null>(null)
	const [readOnly, setReadOnly] = useState(true)
	const dummyInputRef = useRef<HTMLTextAreaElement | null>(null)
	const [inputPlaceHolder, setInputPlaceHolder] = useState(null)

	const form = useForm<Output>({
		resolver: zodResolver(schema),
		defaultValues
	})

	type HandleFocusOptions = {
		focusHackDefaultValue: PathValue<Output, Path<Output>>
	}

	const handleFieldFocus = (field: Path<Output>) => {
		setFocusedField(field)
		setReadOnly(false)

		if (dummyInputRef.current) dummyInputRef.current.focus()
	}

	const handleFocus = (field: Path<Output>, options?: HandleFocusOptions) => {
		if (!isMobile) {
			form.setFocus(field)
			return
		}

		if (focusedField !== field) {
			if (options && isIOS) {
				const currentValue = form.getValues(field)
				setInputPlaceHolder(currentValue)

				form.setValue(field, options.focusHackDefaultValue)

				setTimeout(() => {
					handleFieldFocus(field)

					setTimeout(() => {
						form.setFocus(field)
						setInputPlaceHolder(null)
						form.setValue(field, currentValue)
					}, animationDurationMs)
				}, iOSFocusDelay)

				return
			}

			handleFieldFocus(field)

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
		inputPlaceHolder,
		handleFocus,
		handleBlur,
		setReadOnly,
		dummyInputRef,
		handleSubmit: form.handleSubmit(onSubmit),
		animationDuration,
		appliedIOSPreFocusStyles: inputPlaceHolder
			? options?.iOSPreFocusStyles
				? options.iOSPreFocusStyles
				: undefined
			: []
	}
}
