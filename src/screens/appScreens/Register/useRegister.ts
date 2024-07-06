import { useForm } from 'react-hook-form'
import { RegisterFormData, RegisterFormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

export const UseRegister = () => {
  const [optionTransaction, setOptionTransaction] = useState('')
  const [errorOption, setErrorOption] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  })

  const handleSelectOptionTransaction = (option: string) => {
    setOptionTransaction(option)
  }

  const handleRegisterTransaction = (data: RegisterFormData) => {
    if (!optionTransaction) {
      setErrorOption(!errorOption)
      return
    }
    setErrorOption(false)
    console.log(data)
    console.log(optionTransaction)
  }

  return {
    control,
    handleSubmit: handleSubmit(handleRegisterTransaction),
    errors,
    handleSelectOptionTransaction,
    optionTransaction,
    errorOption,
  }
}
