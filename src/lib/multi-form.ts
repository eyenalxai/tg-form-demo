import { z } from "zod"

export const MultiFormSchema = z.object({
	inputOne: z.array(z.string()).optional(),
	inputTwo: z.array(z.string()).optional(),
	inputThree: z.array(z.string()).optional(),
	inputFour: z.array(z.string()).optional(),
	inputFive: z.array(z.string()).optional(),
	inputSix: z.array(z.string()).optional(),
	inputSeven: z.array(z.string()).optional(),
	inputEight: z.array(z.string()).optional(),
	inputNine: z.array(z.string()).optional()
})

export const multiFormFields = Object.keys(MultiFormSchema.shape).map(
	(key) => key as keyof z.infer<typeof MultiFormSchema>
)

export const multiFormDefaultValues = Object.fromEntries(
	multiFormFields.map((key) => [key, ["1", "2", "3", "4", "5", "6"]])
) as z.infer<typeof MultiFormSchema>
