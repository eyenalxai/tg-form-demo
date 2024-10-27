"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { MotionConfig, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useController, useForm } from "react-hook-form"
import { z } from "zod"

import type { Control } from "react-hook-form"

const formSchema = z.object({
	inputOne: z.string(),
	inputTwo: z.string(),
	inputThree: z.string(),
	inputFour: z.string(),
	inputFive: z.string(),
	inputSix: z.string(),
	inputSeven: z.string(),
	inputEight: z.string(),
	inputNine: z.string()
})

type InputFieldProps = {
	focusedField: keyof z.infer<typeof formSchema> | null
	name: keyof z.infer<typeof formSchema>
	control: Control<z.infer<typeof formSchema>>
	handleFocus: (field: keyof z.infer<typeof formSchema>) => void
	handleBlur: (onBlur: () => void) => void
	setFocus: (field: keyof z.infer<typeof formSchema>) => void
}

const InputField = ({ focusedField, name, control, handleFocus, handleBlur, setFocus }: InputFieldProps) => {
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
					top: focusedField === field.name ? "12rem" : "unset",
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

type DemoFormProps = {
	className?: string
}

export const DemoFormMotion = ({ className }: DemoFormProps) => {
	const [focusedField, setFocusedField] = useState<keyof z.infer<typeof formSchema> | null>(null)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			inputOne: "",
			inputTwo: "",
			inputThree: "",
			inputFour: "",
			inputFive: "",
			inputSix: "",
			inputSeven: "",
			inputEight: "",
			inputNine: ""
		}
	})

	const fields = [
		"inputOne",
		"inputTwo",
		"inputThree",
		"inputFour",
		"inputFive",
		"inputSix",
		"inputSeven",
		"inputEight",
		"inputNine"
	] satisfies (keyof z.infer<typeof formSchema>)[]

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	const handleFocus = (field: keyof z.infer<typeof formSchema>) => {
		setFocusedField(field)
	}

	const handleBlur = (onBlur: () => void) => {
		setFocusedField(null)
		onBlur()
	}

	return (
		<Form {...form}>
			<MotionConfig
				transition={{
					type: "spring",
					duration: 0.4,
					bounce: 0.1
				}}
			>
				<textarea
					id={"dummy-input"}
					className={cn(
						"size-px",
						"fixed",
						"top-0",
						"bg-transparent",
						"pointer-events-none",
						"focus:ring-0",
						"focus:outline-none"
					)}
				/>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn("flex", "flex-col", "relative", "z-100", "gap-y-6", "mb-24", className)}
				>
					<div
						className={cn(
							"pointer-events-none",
							"absolute",
							"-m-4",
							"inset-0",
							"z-30",
							["transition-all", "duration-500", "ease-in-out"],

							focusedField !== null && ["bg-black/10", "blur-[10px]"]
						)}
					/>
					{fields.map((name) => {
						return (
							<FormField
								key={name}
								control={form.control}
								name={name}
								render={({ field }) => (
									<InputField
										focusedField={focusedField}
										name={field.name}
										control={form.control}
										handleFocus={handleFocus}
										handleBlur={handleBlur}
										setFocus={form.setFocus}
									/>
								)}
							/>
						)
					})}
					<motion.div
						style={{
							order: 99,
							width: "100%"
						}}
						layout
					>
						<Button
							disabled={focusedField !== null}
							className={cn(
								"w-full",
								["transition-all", "duration-500", "ease-in-out"],
								"disabled:opacity-30",
								focusedField !== null && ["blur-[3px]", "pointer-events-none"]
							)}
							type="submit"
						>
							Submit
						</Button>
					</motion.div>
				</form>
			</MotionConfig>
		</Form>
	)
}
