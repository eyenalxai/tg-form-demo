"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { forwardRef, useEffect, useRef, useState } from "react"
import type { InputHTMLAttributes } from "react"

interface MultiSelectInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	options: string[]
	value: string[] | undefined
	onChange: (value: string[]) => void
	placeholder?: string
}

export const MultiSelectInput = forwardRef<HTMLInputElement, MultiSelectInputProps>(
	({ options, value = [], onChange, placeholder = "Выберите значения", ...props }, ref) => {
		const [isOpen, setIsOpen] = useState(false)
		const [searchTerm, setSearchTerm] = useState("")
		const containerRef = useRef<HTMLDivElement>(null)

		const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))

		const toggleOption = (option: string) => {
			const newValue = value.includes(option) ? value.filter((v) => v !== option) : [...value, option]
			onChange(newValue)
		}

		const handleDeleteValue = (optionToDelete: string) => {
			onChange(value.filter((v) => v !== optionToDelete))
		}

		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
					setIsOpen(false)
				}
			}

			document.addEventListener("mousedown", handleClickOutside)
			return () => {
				document.removeEventListener("mousedown", handleClickOutside)
			}
		}, [])

		return (
			<div ref={containerRef} className="relative w-full space-y-4">
				<div className="flex flex-row items-center gap-x-2">
					<Button
						type="button"
						variant="outline"
						aria-expanded={isOpen}
						className="w-full justify-between"
						onClick={() => setIsOpen(!isOpen)}
						disabled={props.disabled}
					>
						{value.length > 0 ? `${value.length} выбрано` : placeholder}
						<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
					</Button>
				</div>
				{isOpen && (
					<div className="absolute z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
						<Input
							type="text"
							placeholder="Поиск..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full"
						/>
						<ScrollArea className="h-[200px]">
							{filteredOptions.map((option) => (
								<Button
									key={option}
									type="button"
									variant="ghost"
									onClick={() => toggleOption(option)}
									className={cn(
										"flex w-full items-center justify-start gap-2 px-2 py-1.5",
										value.includes(option) && "bg-accent"
									)}
								>
									<Check className={cn("mr-2 size-4", value.includes(option) ? "opacity-100" : "opacity-0")} />
									{option}
								</Button>
							))}
						</ScrollArea>
					</div>
				)}
				{value.length > 0 && (
					<div className={cn("grid grid-cols-2 gap-2 sm:grid-cols-3")}>
						{value.map((v) => (
							<Button
								key={v}
								disabled={props.disabled}
								variant="secondary"
								className={cn("flex h-auto items-center justify-between px-3 py-1")}
								onClick={() => handleDeleteValue(v)}
								type="button"
							>
								<span className={cn("mr-2 truncate")}>{v}</span>
								<X className={cn("size-3 shrink-0")} />
							</Button>
						))}
					</div>
				)}
			</div>
		)
	}
)

MultiSelectInput.displayName = "MultiSelectInput"
