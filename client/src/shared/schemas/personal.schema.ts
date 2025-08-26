import z from 'zod'

export const personalSchema = z.object({
	name: z.string().min(3, 'Имя должно быть не менее 3 символов!').optional(),
	address: z.string().optional(),
	email: z.email('Некорректная почта').optional(),
	paymentType: z.enum(['CARD', 'CASH']).optional(),
	phone: z.string().optional(),
	deliveryType: z.enum(['DELIVERY', 'PICKUP']).optional(),
	city: z.string().optional(),
	avatar: z.any().optional(),
	index: z.string().optional(),
	isTwoFactorEnabled: z.enum(['true', 'false']).optional()
})

export type PersonalSchema = z.infer<typeof personalSchema>
