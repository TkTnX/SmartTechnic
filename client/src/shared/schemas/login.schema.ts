import z from "zod";





export const loginSchema = z.object({
    emailOrPhone: z.string().nonempty('Почта или телефон обязательны!'),
    password: z.string().nonempty('Пароль обязательный!').min(6, 'Пароль должен быть не менее 6 символов!')
})

export type LoginSchema = z.infer<typeof loginSchema>