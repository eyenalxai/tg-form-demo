"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { useState } from "react"
import { useController, useForm } from "react-hook-form"
import { z } from "zod"
type DemoFormProps = {
	className?: string
}
import { type Control, Controller } from "react-hook-form"

const formSchema = z.object({
	inputOne: z.string(),
	inputTwo: z.string(),
	inputThree: z.string(),
	inputFour: z.string(),
	inputFive: z.string(),
	inputSix: z.string(),
	inputSeven: z.string()
})

type OofProps = {
	focusedField: keyof z.infer<typeof formSchema> | null
	order: number
	name: keyof z.infer<typeof formSchema>
	control: Control<z.infer<typeof formSchema>>
	handleFocus: (field: keyof z.infer<typeof formSchema>) => void
	handleBlur: (onBlur: () => void) => void
}

const Oof = ({ focusedField, order, name, control, handleFocus, handleBlur }: OofProps) => {
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
				position: focusedField === field.name ? "absolute" : "static",
				width: focusedField === field.name ? "100%" : "auto",
				zIndex: focusedField === field.name ? 20 : 10
			}}
		>
			<motion.div
				animate={{
					scale: focusedField === field.name ? 1.2 : 1,
					backgroundColor: focusedField === field.name ? "white" : "transparent"
				}}
			>
				<FormItem
					className={cn(
						["transition-all", "duration-300", "ease-in-out"],
						focusedField === field.name ? ["shadow-2xl", "p-2", "rounded-md"] : []
					)}
				>
					<FormLabel>{field.name}</FormLabel>
					<FormControl>
						<Input
							onFocus={() => handleFocus(field.name)}
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
			inputSeven: ""
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
					className={cn("flex", "relative", "flex-col", "gap-y-6", className)}
				>
					<FormField
						control={form.control}
						name="inputOne"
						render={({ field }) => (
							<Oof
								focusedField={focusedField}
								order={1}
								name={field.name}
								control={form.control}
								handleFocus={handleFocus}
								handleBlur={handleBlur}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="inputTwo"
						render={({ field }) => (
							<Oof
								focusedField={focusedField}
								order={2}
								name={field.name}
								control={form.control}
								handleFocus={handleFocus}
								handleBlur={handleBlur}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="inputThree"
						render={({ field }) => (
							<Oof
								focusedField={focusedField}
								order={3}
								name={field.name}
								control={form.control}
								handleFocus={handleFocus}
								handleBlur={handleBlur}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="inputFour"
						render={({ field }) => (
							<Oof
								focusedField={focusedField}
								order={4}
								name={field.name}
								control={form.control}
								handleFocus={handleFocus}
								handleBlur={handleBlur}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="inputFive"
						render={({ field }) => (
							<Oof
								focusedField={focusedField}
								order={5}
								name={field.name}
								control={form.control}
								handleFocus={handleFocus}
								handleBlur={handleBlur}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="inputSix"
						render={({ field }) => (
							<Oof
								focusedField={focusedField}
								order={6}
								name={field.name}
								control={form.control}
								handleFocus={handleFocus}
								handleBlur={handleBlur}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="inputSeven"
						render={({ field }) => (
							<Oof
								focusedField={focusedField}
								order={7}
								name={field.name}
								control={form.control}
								handleFocus={handleFocus}
								handleBlur={handleBlur}
							/>
						)}
					/>
					<Button className={cn("order-[99]")} type="submit" asChild>
						<motion.button layout>Submit</motion.button>
					</Button>
				</form>
			</MotionConfig>
		</Form>
	)
}
