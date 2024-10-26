"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { MotionConfig, motion } from "framer-motion"
import { useState } from "react"
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
	order: number
	name: keyof z.infer<typeof formSchema>
	control: Control<z.infer<typeof formSchema>>
	handleFocus: (field: keyof z.infer<typeof formSchema>) => void
	handleBlur: (onBlur: () => void) => void
}

const InputField = ({ focusedField, order, name, control, handleFocus, handleBlur }: InputFieldProps) => {
	const {
		field: { onBlur, ...field }
	} = useController({
		name,
		control
	})

	return (
		<motion.div
			layout
			style={{
				order: focusedField === field.name ? 0 : order,
				width: focusedField === field.name ? "100%" : "auto",
				zIndex: focusedField === field.name ? 50 : 10
			}}
		>
			<motion.div
				animate={{
					scale: focusedField === field.name ? 1 : 1
				}}
			>
				<FormItem
					className={cn(
						["transition-all", "duration-300", "ease-in-out"],
						focusedField === field.name ? ["shadow-2xl", "p-4", "pt-2", "rounded-md", "bg-background"] : []
					)}
				>
					<FormLabel
						className={cn(
							["transition-all", "duration-300", "ease-in-out"],
							focusedField !== null && focusedField !== field.name && "opacity-50"
						)}
					>
						{field.name}
					</FormLabel>
					<FormControl>
						<Input
							disabled={focusedField !== null && focusedField !== field.name}
							className={cn(
								focusedField !== null && focusedField !== field.name && "pointer-events-none",
								"bg-background"
							)}
							onFocus={() => {
								handleFocus(field.name)
							}}
							onBlur={() => handleBlur(onBlur)}
							placeholder={field.name}
							{...field}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			</motion.div>
		</motion.div>
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

	const fieldNameOrderMap = {
		inputOne: 1,
		inputTwo: 2,
		inputThree: 3,
		inputFour: 4,
		inputFive: 5,
		inputSix: 6,
		inputSeven: 7,
		inputEight: 8,
		inputNine: 9
	} satisfies Record<keyof z.infer<typeof formSchema>, number>

	const entries = Object.entries(fieldNameOrderMap) as [keyof z.infer<typeof formSchema>, number][]

	return (
		<Form {...form}>
			<MotionConfig
				transition={{
					type: "spring",
					duration: 0.5,
					bounce: 0.1
				}}
			>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className={cn("flex", "relative", "flex-col", "gap-y-6", "mb-24", className)}
				>
					{entries.map(([key, value]) => {
						return (
							<FormField
								key={key}
								control={form.control}
								name={key}
								render={({ field }) => (
									<InputField
										focusedField={focusedField}
										order={value}
										name={field.name}
										control={form.control}
										handleFocus={handleFocus}
										handleBlur={handleBlur}
									/>
								)}
							/>
						)
					})}
					<Button className={cn("order-[99]")} type="submit" asChild>
						<motion.button layout>Submit</motion.button>
					</Button>
				</form>
			</MotionConfig>
		</Form>
	)
}
