"use client"

import { AnimatedContainer } from "@/components/motion-form/animated-container"
import { MultiValueInput } from "@/components/multi-value-input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useAnimatedForm } from "@/lib/animated-form"
import { drawer } from "@/lib/drawer"
import { MultiFormSchema, multiFormDefaultValues, multiFormFields } from "@/lib/multi-form"
import { cn } from "@/lib/utils"
import { MotionConfig, motion } from "framer-motion"
import type { z } from "zod"

export const AnimatedFormMulti = () => {
	const { setIsOpen } = drawer()

	const onSubmit = (_values: z.infer<typeof MultiFormSchema>) => {
		setIsOpen(true)
	}

	const {
		form,
		isMobile,
		isDisabled,
		focusedField,
		readOnly,
		handleFocus,
		handleBlur,
		dummyInputRef,
		handleSubmit,
		animationDuration
	} = useAnimatedForm(MultiFormSchema, multiFormDefaultValues, onSubmit)

	return (
		<Form {...form}>
			<MotionConfig
				transition={{
					type: "spring",
					duration: animationDuration,
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
					{isMobile && (
						<div
							className={cn(
								"fixed",
								"pointer-events-none",
								["transition-[backdrop-filter]", "will-change-[backdrop-filter]", "duration-200", "ease-in-out"],
								focusedField !== null && ["backdrop-blur-sm"],
								"inset-0",
								"w-full",
								"h-full",
								"z-10"
							)}
						/>
					)}
					{multiFormFields.map((name) => {
						return (
							<FormField
								key={name}
								control={form.control}
								name={name}
								render={({ field: { onBlur, ...field } }) => (
									<AnimatedContainer
										layoutId={field.name}
										isMoved={focusedField === field.name}
										anotherMoved={focusedField !== null && focusedField !== field.name}
										className={cn("bg-background")}
									>
										<FormItem>
											<FormLabel>{field.name}</FormLabel>
											<FormControl>
												<MultiValueInput
													readOnly={readOnly}
													disabled={isDisabled(field.name)}
													placeholder={field.name}
													onFocus={() => handleFocus(name)}
													onBlur={() => handleBlur(onBlur)}
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
