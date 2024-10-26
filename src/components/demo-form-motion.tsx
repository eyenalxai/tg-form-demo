"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { MotionConfig, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useController, useForm } from "react-hook-form"
import { z } from "zod"

import type { Control } from "react-hook-form"
import { useInView } from "react-intersection-observer"

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
		field: { onBlur, ref: fieldRef, ...field }
	} = useController({
		name,
		control
	})

	const inputRef = useRef<HTMLInputElement | null>(null)

	const { ref: inViewRef, inView } = useInView({
		triggerOnce: false,
		threshold: 0.1
	})

	const setRefs = (node: HTMLInputElement | null) => {
		inputRef.current = node
		inViewRef(node)
		if (typeof fieldRef === "function") {
			fieldRef(node)
		}
	}

	useEffect(() => {
		let timeoutId: NodeJS.Timeout

		const scrollIntoView = () => {
			if (focusedField === field.name && inputRef.current) {
				console.log(`Scrolling ${field.name} into view`)
				inputRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
			}
		}

		const debouncedScroll = () => {
			clearTimeout(timeoutId)
			timeoutId = setTimeout(scrollIntoView, 100)
		}

		if (focusedField === field.name && !inView) {
			scrollIntoView()
		}

		if (focusedField === field.name) {
			window.addEventListener("scroll", debouncedScroll)
		}

		return () => {
			window.removeEventListener("scroll", debouncedScroll)
			clearTimeout(timeoutId)
		}
	}, [focusedField, inView, field.name])

	return (
		<motion.div
			layout
			style={{
				order: focusedField === field.name ? 0 : order,
				position: focusedField === field.name ? "absolute" : "static",
				top: focusedField === field.name ? "10%" : "auto",
				width: focusedField === field.name ? "100%" : "auto",
				zIndex: focusedField === field.name ? 20 : 10
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
							ref={setRefs}
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
					className={cn("flex", "relative", "flex-col", "gap-y-6", "mb-24", className)}
				>
					<FormField
						control={form.control}
						name="inputOne"
						render={({ field }) => (
							<InputField
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
							<InputField
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
							<InputField
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
							<InputField
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
							<InputField
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
							<InputField
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
							<InputField
								focusedField={focusedField}
								order={7}
								name={field.name}
								control={form.control}
								handleFocus={handleFocus}
								handleBlur={handleBlur}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="inputEight"
						render={({ field }) => (
							<InputField
								focusedField={focusedField}
								order={8}
								name={field.name}
								control={form.control}
								handleFocus={handleFocus}
								handleBlur={handleBlur}
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="inputNine"
						render={({ field }) => (
							<InputField
								focusedField={focusedField}
								order={9}
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
