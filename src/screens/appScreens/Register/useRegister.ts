import { useForm } from 'react-hook-form'
import { RegisterFormData, RegisterFormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'

export const UseRegister = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  })

  const handleRegisterTransaction = (data: RegisterFormData) => {
    console.log(data)
  }

  return {
    control,
    handleSubmit: handleSubmit(handleRegisterTransaction),
    errors,
  }
}
