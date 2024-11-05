"use client"

import { MultiSelectInput } from "@/components/multi-select"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { MultiFormSchema, multiFormDefaultValues, multiFormFields } from "@/lib/multi-form"

import { useDrawer } from "@/lib/use-drawer"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import type { z } from "zod"

export const AnimatedFormMultiSelect = () => {
	const form = useForm<z.infer<typeof MultiFormSchema>>({
		resolver: zodResolver(MultiFormSchema),
		defaultValues: multiFormDefaultValues
	})

	const { setIsOpen } = useDrawer()

	function onSubmit(_values: z.infer<typeof MultiFormSchema>) {
		setIsOpen(true)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6")}>
				{multiFormFields.map((name) => {
					return (
						<FormField
							key={name}
							control={form.control}
							name={name}
							render={({ field: { onBlur, ...field } }) => (
								<FormItem>
									<FormLabel>{field.name}</FormLabel>
									<FormControl>
										<MultiSelectInput
											options={[
												"Option 1",
												"Option 2",
												"Option 3",
												"Option 4",
												"Option 5",
												"Option 6",
												"Option 7",
												"Option 8",
												"Option 9",
												"Option 10",
												"Option 11",
												"Option 12",
												"Option 13",
												"Option 14",
												"Option 15",
												"Option 16",
												"Option 17",
												"Option 18",
												"Option 19",
												"Option 20"
											]}
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					)
				})}
				<motion.div layout={"position"}>
					<Button className={cn("w-full")} type="submit">
						Submit
					</Button>
				</motion.div>
			</form>
		</Form>
	)
}
