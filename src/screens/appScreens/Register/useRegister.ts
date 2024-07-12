import { useForm } from 'react-hook-form'
import { RegisterFormData, RegisterFormSchema } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { formatDate } from '@/utils/dataFormat'
import { formatPrice } from '@/utils/priceFormat'
import { UserActions } from '@/services/actions/userActions'
import { useUser } from '@/contexts/userContext'

export const UseRegister = () => {
  const [optionTransaction, setOptionTransaction] = useState('')
  const { user } = useUser()
  // const [errorOption, setErrorOption] = useState(false)
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
    if (!optionTransaction || !user) {
      // setErrorOption(!errorOption)
      return
    }
    // setErrorOption(false)

    const { fullDate, month, year } = formatDate()
    const dataTransaction = {
      ...data,
      price: formatPrice(data.price),
      categoria: optionTransaction,
      fullDate,
      year,
      month,
    }

    UserActions.setUserTransactionAction(dataTransaction, user)

    console.log({
      ...data,
      price: formatPrice(data.price),
      categoria: optionTransaction,
      fullDate,
      year,
      month,
    })
    console.log(optionTransaction)
  }

  return {
    control,
    handleSubmit: handleSubmit(handleRegisterTransaction),
    errors,
    handleSelectOptionTransaction,
    optionTransaction,
    // errorOption,
  }
}
