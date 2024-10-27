import { z } from "zod"

export const FormSchema = z.object({
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

export const formFields = Object.keys(FormSchema.shape).map((key) => key as keyof z.infer<typeof FormSchema>)

export const formDefaultValues = Object.fromEntries(formFields.map((key) => [key, ""])) as z.infer<typeof FormSchema>
