import z from 'zod'

export const promoSchema = z.object({
	title: z.string().nonempty('Название обязательно!'),
	text: z.any().optional(),
	preview: z.any().optional(),
	image: z.any().optional()
})

export type PromoSchema = z.infer<typeof promoSchema>
