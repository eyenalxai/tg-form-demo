"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

type DemoFormProps = {
	className?: string
}

export const DemoForm = ({ className }: DemoFormProps) => {
	const formSchema = z.object({
		inputOne: z.string(),
		inputTwo: z.string(),
		inputThree: z.string(),
		inputFour: z.string(),
		inputFive: z.string(),
		inputSix: z.string(),
		inputSeven: z.string()
	})

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

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6", className)}>
				<FormField
					control={form.control}
					name="inputOne"
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
				<FormField
					control={form.control}
					name="inputTwo"
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
				<FormField
					control={form.control}
					name="inputThree"
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
				<FormField
					control={form.control}
					name="inputFour"
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
				<FormField
					control={form.control}
					name="inputFive"
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
				<FormField
					control={form.control}
					name="inputSix"
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
				<FormField
					control={form.control}
					name="inputSeven"
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
				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
