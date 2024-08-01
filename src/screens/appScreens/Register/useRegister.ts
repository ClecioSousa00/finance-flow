import { useEffect, useState } from 'react'
import { formatDate } from '@/utils/dataFormat'
import { UserActions } from '@/services/actions/userActions'
import { useUser } from '@/contexts/userContext'
import { Transaction } from '@/services/dataBaseTypes'
import { formattedValueInput } from '@/utils/priceFormat'

export const UseRegister = () => {
  const { user } = useUser()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [nameError, setNameError] = useState('')
  const [priceError, setPriceError] = useState('')

  const [optionTransaction, setOptionTransaction] = useState('')
  const [errorOptionTransaction, setErrorOptionTransaction] = useState('')

  const handlePriceChange = (event: string) => {
    const value = formattedValueInput(event.replace(/\D/g, ''))
      .replace(/\./g, '')
      .replace(',', '.')
    setPrice(value)
  }
  const handleSelectOptionTransaction = (option: string) => {
    setOptionTransaction(option)
  }

  const handleRegisterTransaction = (
    name: string,
    price: string,
    optionTransaction: string,
  ) => {
    if (!user) return

    const { fullDate, month, year } = formatDate()
    const dataTransaction: Transaction = {
      name,
      price,
      categoria: optionTransaction,
      fullDate,
      year,
      month,
    }

    UserActions.setUserTransactionAction(dataTransaction, user)
  }

  const onSubmit = () => {
    if (!name || !price || !optionTransaction) {
      if (!name) setNameError('Informe o nome da transação.')
      if (!price || !parseFloat(price.replace(/\D/g, '')))
        setPriceError('Informe o preço da transação.')
      if (!optionTransaction)
        setErrorOptionTransaction('Informe uma categoria.')
      return
    }

    if (name.length <= 5) {
      setNameError('O nome deve possui mais de 5 caracteres.')
    }

    handleRegisterTransaction(name, price.replace(/\D/g, ''), optionTransaction)
  }

  useEffect(() => {
    if (price) setPriceError('')
    if (name.length > 5) setNameError('')
    if (optionTransaction) setErrorOptionTransaction('')
  }, [name, price, optionTransaction])

  return {
    name,
    setName,
    nameError,
    price,
    handlePriceChange,
    priceError,
    handleSelectOptionTransaction,
    optionTransaction,
    errorOptionTransaction,
    onSubmit,
  }
}
