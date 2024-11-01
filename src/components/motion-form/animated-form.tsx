"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { MotionConfig, motion } from "framer-motion"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { AnimatedContainer } from "@/components/motion-form/animated-container"
import { AnimatedInputAnother } from "@/components/motion-form/animated-input-another"
import { FormSchema, formDefaultValues, formFields } from "@/lib/form"
import { useIsMobile } from "@/lib/is-mobile"
import { useDrawer } from "@/lib/use-drawer"

export const AnimatedForm = () => {
	const isMobile = useIsMobile()
	const [focusedField, setFocusedField] = useState<keyof z.infer<typeof FormSchema> | null>(null)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: formDefaultValues
	})

	const { setIsOpen } = useDrawer()

	function onSubmit(_values: z.infer<typeof FormSchema>) {
		setIsOpen(true)
	}

	const dummyInputRef = useRef<HTMLTextAreaElement | null>(null)

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
					ref={dummyInputRef}
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
				<form onSubmit={form.handleSubmit(onSubmit)} className={cn("flex", "w-full", "flex-col", "z-100", "gap-y-6")}>
					{formFields.map((name) => {
						return (
							<AnimatedContainer
								key={name}
								isMoved={focusedField === name}
								anotherMoved={focusedField !== null && focusedField !== name}
								className={cn("bg-background")}
							>
								<FormField
									control={form.control}
									name={name}
									render={({ field: { onBlur, ...field } }) => (
										<FormItem>
											<FormLabel>{field.name}</FormLabel>
											<FormControl>
												<AnimatedInputAnother
													isFocused={focusedField === field.name}
													setFocusedField={setFocusedField}
													disabled={isMobile && focusedField !== null && focusedField !== field.name}
													setFocus={form.setFocus}
													dummyInputRef={dummyInputRef}
													placeholder={field.name}
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</AnimatedContainer>
						)
					})}
					<motion.div layout={"position"}>
						<Button
							disabled={isMobile && focusedField !== null}
							className={cn(
								"w-full",
								isMobile && [
									["transition-all", "duration-500", "ease-in-out"],
									"disabled:opacity-30",
									focusedField !== null && ["blur-[3px]", "pointer-events-none"]
								]
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
