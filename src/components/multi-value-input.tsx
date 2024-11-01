"use client"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Plus, X } from "lucide-react"
import type React from "react"
import {
	type ChangeEvent,
	type InputHTMLAttributes,
	type KeyboardEvent,
	forwardRef,
	useEffect,
	useRef,
	useState
} from "react"

interface MultiInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	value?: string[]
	onChange?: (value: string[]) => void
	placeholder?: string
}

const MultiValueInput = forwardRef<HTMLInputElement, MultiInputProps>(({ value, onChange, ...props }, ref) => {
	const [inputValue, setInputValue] = useState("")
	const [internalValues, setInternalValues] = useState(value || [])

	useEffect(() => {
		setInternalValues(value || [])
	}, [value])

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value)
	}

	const notifyChange = (newValues: string[]) => {
		if (onChange) {
			onChange(newValues)
		}
	}

	const handleAddValue = () => {
		if (inputValue.trim() !== "") {
			const newValues = [...internalValues, inputValue.trim()]
			setInternalValues(newValues)
			notifyChange(newValues)
			setInputValue("")
		}
	}

	const handleDeleteValue = (index: number) => {
		const newValues = internalValues.filter((_, i) => i !== index)
		setInternalValues(newValues)
		notifyChange(newValues)
	}

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault()
			handleAddValue()
		}
	}

	const inputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (typeof ref === "function") {
			ref(inputRef.current)
		} else if (ref) {
			ref.current = inputRef.current
		}
	}, [ref])

	return (
		<div
			className={cn("w-full", "space-y-4")}
			onMouseDown={(e) => {
				if ((e.target as Element) !== inputRef.current) {
					e.preventDefault()
				}
			}}
		>
			<div className={cn("flex", "flex-row", "gap-x-2")}>
				<Input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyPress}
					placeholder={props.placeholder || "Введите значение"}
					ref={inputRef}
					{...props}
				/>
				<Button
					disabled={inputValue.trim() === "" || internalValues.includes(inputValue.trim())}
					onMouseDown={(e) => e.preventDefault()}
					onClick={handleAddValue}
					size="sm"
					type="button"
				>
					<Plus className="size-4" />
				</Button>
			</div>
			{internalValues.length > 0 ? (
				<div className={cn("grid", "grid-cols-2", "gap-2", "sm:grid-cols-3")}>
					{internalValues.map((value, index) => (
						<Button
							key={value}
							variant="secondary"
							className={cn("flex", "h-auto", "items-center", "justify-between", "px-3", "py-1")}
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => handleDeleteValue(index)}
							type="button"
							asChild
						>
							<motion.button layout={"position"}>
								<span className={cn("mr-2", "truncate")}>{value}</span>
								<X className={cn("size-3", "shrink-0")} />
							</motion.button>
						</Button>
					))}
				</div>
			) : (
				<p className="text-center text-sm text-muted-foreground">Пусто</p>
			)}
		</div>
	)
})

MultiValueInput.displayName = "MultiValueInput"

export { MultiValueInput }
