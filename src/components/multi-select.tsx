import { type VariantProps, cva } from "class-variance-authority"
import { CheckIcon, ChevronDown, XIcon } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

const multiSelectVariants = cva(
	"m-1 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110",
	{
		variants: {
			variant: {
				default: "border-foreground/10 bg-card text-foreground hover:bg-card/80",
				secondary: "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				inverted: "inverted"
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
)

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
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
				<PopoverTrigger asChild>
					<Button
						ref={ref}
						onClick={handleTogglePopover}
						className={cn(
							"flex h-auto min-h-10 w-full items-center justify-between rounded-md border bg-inherit p-1 hover:bg-inherit",
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
												"border-foreground/1 bg-transparent text-foreground hover:bg-transparent",
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
										<CommandItem key={option} onSelect={() => toggleOption(option)} className="cursor-pointer my-1">
											<div
												className={cn(
													"mr-2 my-0.5 flex size-5 items-center justify-center rounded-sm border border-primary",
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
