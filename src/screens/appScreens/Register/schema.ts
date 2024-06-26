import { z } from 'zod'

export const RegisterFormSchema = z.object({
  name: z.string({ required_error: 'Informe o nome da transação.' }),
  price: z.string({ required_error: 'Informe o preço da transação.' }),
})

export type RegisterFormData = z.infer<typeof RegisterFormSchema>
