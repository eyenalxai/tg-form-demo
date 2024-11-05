import { type VariantProps, cva } from "class-variance-authority"
import { CheckIcon, ChevronDown, WandSparkles, XCircle, XIcon } from "lucide-react"
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
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
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

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
		VariantProps<typeof multiSelectVariants> {
	/**
	 * An array of option objects to be displayed in the multi-select component.
	 * Each option object has a label, value, and an optional icon.
	 */
	options: string[]

	/**
	 * Callback function triggered when the selected values change.
	 * Receives an array of the new selected values.
	 */
	onChange: (value: string[]) => void

	/** The default selected values when the component mounts. */
	value?: string[]

	/**
	 * Placeholder text to be displayed when no values are selected.
	 * Optional, defaults to "Select options".
	 */
	placeholder?: string

	/**
	 * Animation duration in seconds for the visual effects (e.g., bouncing badges).
	 * Optional, defaults to 0 (no animation).
	 */
	animation?: number

	/**
	 * Maximum number of items to display. Extra selected items will be summarized.
	 * Optional, defaults to 3.
	 */
	maxCount?: number

	/**
	 * The modality of the popover. When set to true, interaction with outside elements
	 * will be disabled and only popover content will be visible to screen readers.
	 * Optional, defaults to false.
	 */
	modalPopover?: boolean

	/**
	 * If true, renders the multi-select component as a child of another component.
	 * Optional, defaults to false.
	 */
	asChild?: boolean
	readOnly?: boolean

	/**
	 * Additional class names to apply custom styles to the multi-select component.
	 * Optional, can be used to add custom styles.
	 */
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
			animation = 0,
			maxCount = 3,
			modalPopover = false,
			asChild = false,
			readOnly = false,
			className,
			...props
		},
		ref
	) => {
		const [selectedValues, setSelectedValues] = React.useState<string[]>(value)
		const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
		const [isAnimating, setIsAnimating] = React.useState(false)

		const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "Enter") {
				setIsPopoverOpen(true)
			} else if (event.key === "Backspace" && !event.currentTarget.value) {
				const newSelectedValues = [...selectedValues]
				newSelectedValues.pop()
				setSelectedValues(newSelectedValues)
				onChange(newSelectedValues)
			}
		}

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

		const clearExtraOptions = () => {
			const newSelectedValues = selectedValues.slice(0, maxCount)
			setSelectedValues(newSelectedValues)
			onChange(newSelectedValues)
		}

		const toggleAll = () => {
			if (selectedValues.length === options.length) {
				handleClear()
			} else {
				setSelectedValues(options)
				onChange(options)
			}
		}

		return (
			<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
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
											<Badge
												key={value}
												className={cn(isAnimating ? "animate-bounce" : "", multiSelectVariants({ variant }))}
												style={{ animationDuration: `${animation}s` }}
											>
												{option}
												<XCircle
													className="ml-2 size-4 cursor-pointer"
													onClick={(event) => {
														event.stopPropagation()
														toggleOption(value)
													}}
												/>
											</Badge>
										)
									})}
									{selectedValues.length > maxCount && (
										<Badge
											className={cn(
												"border-foreground/1 bg-transparent text-foreground hover:bg-transparent",
												isAnimating ? "animate-bounce" : "",
												multiSelectVariants({ variant })
											)}
											style={{ animationDuration: `${animation}s` }}
										>
											{`+ ${selectedValues.length - maxCount} more`}
											<XCircle
												className="ml-2 size-4 cursor-pointer"
												onClick={(event) => {
													event.stopPropagation()
													clearExtraOptions()
												}}
											/>
										</Badge>
									)}
								</div>
								<div className="flex items-center justify-between">
									<XIcon
										className="mx-2 h-4 cursor-pointer text-muted-foreground"
										onClick={(event) => {
											event.stopPropagation()
											handleClear()
										}}
									/>
									<Separator orientation="vertical" className="flex h-full min-h-6" />
									<ChevronDown className="mx-2 h-4 cursor-pointer text-muted-foreground" />
								</div>
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
						<CommandInput readOnly={readOnly} placeholder="Search..." onKeyDown={handleInputKeyDown} />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								<CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
									<div
										className={cn(
											"mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
											selectedValues.length === options.length
												? "bg-primary text-primary-foreground"
												: "opacity-50 [&_svg]:invisible"
										)}
									>
										<CheckIcon className="size-4" />
									</div>
									<span>(Select All)</span>
								</CommandItem>
								{options.map((option) => {
									const isSelected = selectedValues.includes(option)
									return (
										<CommandItem key={option} onSelect={() => toggleOption(option)} className="cursor-pointer">
											<div
												className={cn(
													"mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
													isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
												)}
											>
												<CheckIcon className="size-4" />
											</div>

											<span>{option}</span>
										</CommandItem>
									)
								})}
							</CommandGroup>
							<CommandSeparator />
							<CommandGroup>
								<div className="flex items-center justify-between">
									{selectedValues.length > 0 && (
										<>
											<CommandItem onSelect={handleClear} className="flex-1 cursor-pointer justify-center">
												Clear
											</CommandItem>
											<Separator orientation="vertical" className="flex h-full min-h-6" />
										</>
									)}
									<CommandItem
										onSelect={() => setIsPopoverOpen(false)}
										className="max-w-full flex-1 cursor-pointer justify-center"
									>
										Close
									</CommandItem>
								</div>
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
				{animation > 0 && selectedValues.length > 0 && (
					<WandSparkles
						className={cn(
							"my-2 size-3 cursor-pointer bg-background text-foreground",
							isAnimating ? "" : "text-muted-foreground"
						)}
						onClick={() => setIsAnimating(!isAnimating)}
					/>
				)}
			</Popover>
		)
	}
)

MultiSelect.displayName = "MultiSelect"
