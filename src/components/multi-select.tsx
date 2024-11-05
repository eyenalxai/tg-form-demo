import { type VariantProps, cva } from "class-variance-authority"
import { CheckIcon, ChevronDown } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

const multiSelectVariants = cva("m-1 transition duration-150 ease-in-out", {
	variants: {
		variant: {
			default: "bg-silver hover:bg-silver border text-foreground",
			secondary: "border-foreground/10 bg-secondary text-secondary-foreground",
			destructive: "border-transparent bg-destructive text-destructive-foreground",
			inverted: "inverted"
		}
	},
	defaultVariants: {
		variant: "default"
	}
})

interface MultiSelectProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
		VariantProps<typeof multiSelectVariants> {
	options: string[]
	onChange: (value: string[]) => void
	value?: string[]
	placeholder?: string
	maxCount?: number
	readOnly?: boolean
	className?: string
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
	(
		{
			options,
			onChange,
			variant,
			value = [],
			placeholder = "Select options",
			maxCount = 3,
			readOnly = false,
			className,
			...props
		},
		ref
	) => {
		const [selectedValues, setSelectedValues] = React.useState<string[]>(value)
		const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

		const toggleOption = (option: string) => {
			const newSelectedValues = selectedValues.includes(option)
				? selectedValues.filter((value) => value !== option)
				: [...selectedValues, option]
			setSelectedValues(newSelectedValues)
			onChange(newSelectedValues)
		}

		const handleClear = () => {
			setSelectedValues([])
			onChange([])
		}

		const handleTogglePopover = () => {
			setIsPopoverOpen((prev) => !prev)
		}

		return (
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal>
				<PopoverTrigger disabled={props.disabled} asChild>
					<Button
						ref={ref}
						onClick={handleTogglePopover}
						className={cn(
							"flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-white p-1 hover:bg-white",
							className
						)}
						{...props}
					>
						{selectedValues.length > 0 ? (
							<div className="flex w-full items-center justify-between">
								<div className="flex flex-wrap items-center">
									{selectedValues.slice(0, maxCount).map((value) => {
										const option = options.find((o) => o === value)
										return (
											<Badge key={value} className={cn(multiSelectVariants({ variant }))}>
												{option}
											</Badge>
										)
									})}
									{selectedValues.length > maxCount && (
										<Badge
											className={cn(
												"border-black/1 text-foreground bg-silver hover:bg-silver",
												multiSelectVariants({ variant })
											)}
										>
											{`+ ещё ${selectedValues.length - maxCount}`}
										</Badge>
									)}
								</div>
								<ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
							</div>
						) : (
							<div className="mx-auto flex w-full items-center justify-between">
								<span className="mx-3 text-sm text-muted-foreground">{placeholder}</span>
								<ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
							</div>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start" onEscapeKeyDown={() => setIsPopoverOpen(false)}>
					<Command>
						<CommandList>
							<CommandGroup>
								<CommandItem onSelect={handleClear} className="flex-1 cursor-pointer justify-center">
									Удалить все
								</CommandItem>
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup>
								{options.map((option) => {
									const isSelected = selectedValues.includes(option)
									return (
										<CommandItem key={option} onSelect={() => toggleOption(option)} className="my-1 cursor-pointer">
											<div
												className={cn(
													"my-0.5 mr-2 flex size-5 items-center justify-center rounded-sm border border-primary",
													isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
												)}
											>
												<CheckIcon className="size-5" />
											</div>
											<span>{option}</span>
										</CommandItem>
									)
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		)
	}
)

MultiSelect.displayName = "MultiSelect"
