"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TextFormSchema, textFormDefaultValues, textFormFields } from "@/lib/text-form"
import { useDrawer } from "@/lib/use-drawer"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

type DefaultFormProps = {
	className?: string
}

export const DefaultForm = ({ className }: DefaultFormProps) => {
	const form = useForm<z.infer<typeof TextFormSchema>>({
		resolver: zodResolver(TextFormSchema),
		defaultValues: textFormDefaultValues
	})

	const { setIsOpen } = useDrawer()

	function onSubmit(_values: z.infer<typeof TextFormSchema>) {
		setIsOpen(true)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
				{textFormFields.map((name) => (
					<FormField
						key={name}
						control={form.control}
						name={name}
						render={({ field }) => (
							<FormItem>
								<FormLabel>{field.name}</FormLabel>
								<FormControl>
									<Input placeholder={field.name} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<Button className={cn("w-full")} type="submit">
					Submit
				</Button>
			</form>
		</Form>
	)
}
