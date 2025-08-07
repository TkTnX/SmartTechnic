import z from "zod";





export const registerSchema = z.object({
    name: z.string().min(3, 'Имя должно быть не менее 3 символов!').nonempty('Имя обязательно!'),
    email: z.string().nonempty('Почта обязательна!'),
    phone: z.string().nonempty('Телефон обязателен!'),
    password: z.string().nonempty('Пароль обязательный!').min(6, 'Пароль должен быть не менее 6 символов!')
})

export type RegisterSchema = z.infer<typeof registerSchema>