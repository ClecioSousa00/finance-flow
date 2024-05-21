import { z } from 'zod'

export const SendEmailSchema = z.object({
  email: z
    .string({ required_error: 'Informe seu email.' })
    .email('Insira um Email válido.'),
})

export type SendEmailData = z.infer<typeof SendEmailSchema>
