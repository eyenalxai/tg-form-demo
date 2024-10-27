import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { FormSchema } from "@/lib/form"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
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
		if (focusedField === field.name) {
			setIsReadOnly(false)
			const dummyInput = document.getElementById("dummy-input")
			if (dummyInput) {
				dummyInput.focus()
			}

			const timeoutId = setTimeout(() => {
				setFocus(field.name)
			}, 300)

			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [focusedField, field.name, setFocus])

	return (
		<div className={cn("w-full", "relative", "bg-background")}>
			<motion.div
				style={{
					position: focusedField === field.name ? "unset" : "absolute",
					height: "68px"
				}}
				layout
			/>
			<motion.div
				layout={"position"}
				style={{
					position: focusedField === field.name ? "fixed" : "unset",
					top: focusedField === field.name ? "6rem" : "unset",
					width: focusedField === field.name ? "calc(100% - 2rem)" : "auto",
					left: focusedField === field.name ? "1rem" : "unset",
					right: focusedField === field.name ? "1rem" : "unset",
					zIndex: focusedField === field.name ? 30 : 20,
					padding: focusedField === field.name ? "0.5rem 1rem 1rem 1rem" : "0",
					background: "background",
					borderRadius: focusedField === field.name ? "var(--radius)" : "0"
				}}
			>
				<FormItem className={cn(["transition-all", "duration-500", "ease-in-out"])}>
					<FormLabel
						className={cn(
							["transition-all", "duration-500", "ease-in-out"],
							focusedField !== null && focusedField !== field.name && ["opacity-50", "blur-[2px]"]
						)}
					>
						{field.name}
					</FormLabel>
					<FormControl>
						<Input
							readOnly={isReadOnly}
							disabled={focusedField !== null && focusedField !== field.name}
							className={cn(
								"duration-500",
								"ease-in-out",
								focusedField !== null && focusedField !== field.name && ["pointer-events-none", "blur-[2px]"]
							)}
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
					</FormControl>
					<FormMessage />
				</FormItem>
			</motion.div>
		</div>
	)
}
