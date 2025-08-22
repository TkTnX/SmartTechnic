import z from 'zod'

export const productSchema = z.object({
	name: z.string().nonempty('Название продукта обязательно!'),
	price: z.number('Цена должна быть числом'),
	oldPrice: z.number().optional(),
	brand: z.string().nonempty('Бренд обязателен!'),
	description: z.string().nonempty('Описание обязательно!'),
	quantity: z.number('Количество должно быть числом'),
	images: z
		.any()
		.refine(
			files => files?.length > 0,
			'Добавьте хотя бы одно изображение'
		),
	categoryId: z.string().nonempty('Категория обязательна!')
})

export type ProductSchema = z.infer<typeof productSchema>
