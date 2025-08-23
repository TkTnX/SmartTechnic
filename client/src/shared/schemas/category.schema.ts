import z from 'zod';





export const categorySchema = z.object({
	name: z.string().nonempty('Название категории обязательно!')
})

export type CategorySchema = z.infer<typeof categorySchema>