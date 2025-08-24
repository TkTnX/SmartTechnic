import z from 'zod'

export const newsSchema = z.object({
	title: z.string().nonempty('Название обязательно!'),
	text: z.any().optional(),
	image: z.any().optional()
})

export type NewsSchema = z.infer<typeof newsSchema>
