"use client"

import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { MotionConfig, motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { AnimatedInput } from "@/components/motion-form/animated-input"
import { FormSchema, formDefaultValues, formFields } from "@/lib/form"

type AnimatedFormProps = {
	className?: string
}

export const AnimatedForm = ({ className }: AnimatedFormProps) => {
	const [focusedField, setFocusedField] = useState<keyof z.infer<typeof FormSchema> | null>(null)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: formDefaultValues
	})

	function onSubmit(values: z.infer<typeof FormSchema>) {
		console.log(values)
	}

	const handleFocus = (field: keyof z.infer<typeof FormSchema>) => {
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
					className={cn("flex", "flex-col", "relative", "z-100", "gap-y-6", className)}
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
					{formFields.map((name) => {
						return (
							<FormField
								key={name}
								control={form.control}
								name={name}
								render={({ field }) => (
									<AnimatedInput
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
