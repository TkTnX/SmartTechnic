import z from 'zod'

export const specificationSchema = z.object({
	title: z.string().nonempty('Название характеристики обязательно!'),
	value: z.string().nonempty('Значение характеристики обязательно!')
})

export type SpecificationSchema = z.infer<typeof specificationSchema>
