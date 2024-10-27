"use client"

import { AnimatedInput } from "@/components/motion-form/animated-input"
import { Button } from "@/components/ui/button"
import { DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormSchema, formDefaultValues, formFields } from "@/lib/form"
import { useDrawer } from "@/lib/use-drawer"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

type DefaultFormProps = {
	className?: string
}

export const DefaultForm = ({ className }: DefaultFormProps) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: formDefaultValues
	})

	const { setIsOpen } = useDrawer()

	function onSubmit(_values: z.infer<typeof FormSchema>) {
		setIsOpen(true)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
				{formFields.map((name) => (
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
