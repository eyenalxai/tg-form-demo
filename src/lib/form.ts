import { z } from "zod"

export const FormSchema = z.object({
	inputOne: z.string(),
	inputTwo: z.string(),
	inputThree: z.string(),
	inputFour: z.string(),
	inputFive: z.string(),
	inputSix: z.string(),
	inputSeven: z.string(),
	inputEight: z.string(),
	inputNine: z.string()
})

export const formFields = Object.keys(FormSchema.shape).map((key) => key as keyof z.infer<typeof FormSchema>)

export const formDefaultValues = Object.fromEntries(formFields.map((key) => [key, ""])) as z.infer<typeof FormSchema>
