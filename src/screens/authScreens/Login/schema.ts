import { z } from 'zod'

export const loginUserFormSchema = z.object({
  email: z
    .string({ required_error: 'Informe seu email.' })
    .email('Insira um Email válido.'),
  password: z
    .string({ required_error: 'Informe uma senha.' })
    .min(8, 'Sua senha deve conter no mínimo 8 caracteres'),
})

export type LoginUserFormData = z.infer<typeof loginUserFormSchema>
