"use client"

import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"

const frameworks = [
	{
		value: "next.js",
		label: "Next.js"
	},
	{
		value: "sveltekit",
		label: "SvelteKit"
	},
	{
		value: "nuxt.js",
		label: "Nuxt.js"
	},
	{
		value: "remix",
		label: "Remix"
	},
	{
		value: "astro",
		label: "Astro"
	},
	{
		value: "vite",
		label: "Vite"
	},
	{
		value: "snowpack",
		label: "Snowpack"
	},
	{
		value: "esbuild",
		label: "esbuild"
	},
	{
		value: "webpack",
		label: "Webpack"
	},
	{
		value: "parcel",
		label: "Parcel"
	}
]

export function MultipleSelector() {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState<string[]>([])

	const handleSetValue = (val: string) => {
		if (value.includes(val)) {
			value.splice(value.indexOf(val), 1)
			setValue(value.filter((item) => item !== val))
		} else {
			setValue((prevValue) => [...prevValue, val])
		}
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" aria-expanded={open} className="h-fit min-h-12 w-full justify-between">
					<div className="flex flex-wrap justify-start gap-2">
						{value?.length
							? value.map((val) => (
									<div key={val} className="rounded-xl border bg-slate-200 px-2 py-1 text-xs font-medium">
										{frameworks.find((framework) => framework.value === val)?.label}
									</div>
								))
							: "Select framework..."}
					</div>
					<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder="Search framework..." />
					<CommandEmpty>No framework found.</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{frameworks.map((framework) => (
								<CommandItem
									key={framework.value}
									value={framework.value}
									onSelect={() => {
										handleSetValue(framework.value)
									}}
								>
									<Check className={cn("mr-2 size-4", value.includes(framework.value) ? "opacity-100" : "opacity-0")} />
									{framework.label}
								</CommandItem>
							))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
