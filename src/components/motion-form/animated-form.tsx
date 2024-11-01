"use client"

import { AnimatedContainer } from "@/components/motion-form/animated-container"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormSchema, formDefaultValues, formFields } from "@/lib/form"
import { useAnimatedForm } from "@/lib/use-animated-form"
import { useDrawer } from "@/lib/use-drawer"
import { cn } from "@/lib/utils"
import { MotionConfig, motion } from "framer-motion"
import type { z } from "zod"

export const AnimatedForm = () => {
	const { setIsOpen } = useDrawer()

	const onSubmit = (_values: z.infer<typeof FormSchema>) => {
		setIsOpen(true)
	}

	const { form, isMobile, focusedField, setFocusedField, isReadOnly, setIsReadOnly, dummyInputRef, handleSubmit } =
		useAnimatedForm(FormSchema, formDefaultValues, onSubmit)

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
				<form onSubmit={handleSubmit} className={cn("flex", "w-full", "flex-col", "z-100", "gap-y-6")}>
					{formFields.map((name) => {
						return (
							<FormField
								key={name}
								control={form.control}
								name={name}
								render={({ field: { onBlur, ...field } }) => (
									<AnimatedContainer
										isMoved={focusedField === name}
										anotherMoved={focusedField !== null && focusedField !== name}
										className={cn("bg-background")}
									>
										<FormItem>
											<FormLabel>{field.name}</FormLabel>
											<FormControl>
												<Input
													readOnly={isMobile && isReadOnly}
													disabled={isMobile && focusedField !== null && focusedField !== field.name}
													placeholder={field.name}
													onFocus={() => setFocusedField(name)}
													onBlur={() => {
														if (!isReadOnly) {
															setIsReadOnly(true)
															setFocusedField(null)
														}
													}}
													{...field}
												/>
											</FormControl>
										</FormItem>
									</AnimatedContainer>
								)}
							/>
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
