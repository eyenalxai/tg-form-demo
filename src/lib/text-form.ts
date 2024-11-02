import { z } from "zod"

export const TextFormSchema = z.object({
	inputOne: z.string().optional(),
	inputTwo: z.string().optional(),
	inputThree: z.string().optional(),
	inputFour: z.string().optional(),
	inputFive: z.string().optional(),
	inputSix: z.string().optional(),
	inputSeven: z.string().optional(),
	inputEight: z.string().optional(),
	inputNine: z.string().optional()
})

export const textFormFields = Object.keys(TextFormSchema.shape).map(
	(key) => key as keyof z.infer<typeof TextFormSchema>
)

export const textFormDefaultValues = Object.fromEntries(textFormFields.map((key) => [key, ""])) as z.infer<
	typeof TextFormSchema
>
