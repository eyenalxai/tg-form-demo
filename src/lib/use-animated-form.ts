import { useIsMobile } from "@/lib/is-mobile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import { type DefaultValues, type FieldValues, type Path, useForm } from "react-hook-form"
import type { ZodType, ZodTypeDef } from "zod"

export const useAnimatedForm = <Schema extends ZodType<Output, ZodTypeDef, Input>, Output extends FieldValues, Input>(
	schema: Schema,
	defaultValues: DefaultValues<Output>,
	onSubmit: (values: Output) => void
) => {
	const isMobile = useIsMobile()
	const [focusedField, setFocusedField] = useState<Path<Output> | null>(null)
	const [isReadOnly, setIsReadOnly] = useState(true)
	const dummyInputRef = useRef<HTMLTextAreaElement | null>(null)

	const form = useForm<Output>({
		resolver: zodResolver(schema),
		defaultValues
	})

	useEffect(() => {
		if (focusedField) {
			setIsReadOnly(false)

			if (!isMobile) {
				form.setFocus(focusedField)
				return
			}

			if (dummyInputRef.current) dummyInputRef.current.focus()

			const timeoutId = setTimeout(() => {
				form.setFocus(focusedField)
			}, 300)

			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [isMobile, focusedField, form])

	return {
		form,
		isMobile,
		focusedField,
		setFocusedField,
		isReadOnly,
		setIsReadOnly,
		dummyInputRef,
		handleSubmit: form.handleSubmit(onSubmit)
	}
}