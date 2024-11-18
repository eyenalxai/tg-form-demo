"use client"

import { MultiSelect } from "@/components/multi-select"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useAnimatedForm } from "@/lib/animated-form"
import { drawer } from "@/lib/drawer"
import { MultiFormSchema, multiFormDefaultValues, multiFormFields } from "@/lib/multi-form"
import { cn } from "@/lib/utils"
import { MotionConfig, motion } from "framer-motion"
import type { z } from "zod"

export const AnimatedFormMultiSelect = () => {
	const { setIsOpen } = drawer()

	const onSubmit = (_values: z.infer<typeof MultiFormSchema>) => {
		setIsOpen(true)
	}

	const { form, isMobile, isDisabled, focusedField, dummyInputRef, handleSubmit, animationDuration } = useAnimatedForm(
		MultiFormSchema,
		multiFormDefaultValues,
		onSubmit
	)

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
				<form onSubmit={handleSubmit} className={cn("space-y-6")}>
					{multiFormFields.map((name) => {
						return (
							<FormField
								key={name}
								control={form.control}
								name={name}
								render={({ field }) => (
									<FormItem>
										<FormLabel className={cn("z-0")}>{field.name}</FormLabel>
										<FormControl>
											<MultiSelect
												variant={"default"}
												disabled={isDisabled(field.name)}
												options={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
												placeholder={field.name}
												{...field}
											/>
										</FormControl>
									</FormItem>
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
