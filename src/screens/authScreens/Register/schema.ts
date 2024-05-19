import { z } from 'zod'

export const createUserFormSchema = z.object({
  username: z
    .string({ required_error: 'Informe seu nome de usuário.' })
    .min(5, 'Seu nome deve conter no mínimo 5 caracteres.'),
  email: z
    .string({ required_error: 'Informe seu email.' })
    .email('Insira um Email válido.'),
  password: z
    .string({ required_error: 'Informe uma senha.' })
    .min(8, 'Sua senha deve conter no mínimo 8 caracteres'),
})

export type CreateUserFormData = z.infer<typeof createUserFormSchema>
