import z from 'zod'

export const reviewSchema = z.object({
	title: z.string().nonempty('Название обязательно!'),
	comment: z.string().nonempty('Текст обязательен!'),
	rating: z.number("Рейтинг должен быть числом").min(1, 'Минимальный рейтинг - 1!').max(5, 'Максимальный рейтинг - 5!')
})

export type ReviewSchema = z.infer<typeof reviewSchema>
