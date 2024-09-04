import { useEffect, useState } from 'react'

import uuid from 'react-native-uuid'

import { useUser } from '@/contexts/userContext'

import { UserActions } from '@/services/actions/userActions'

import { formatDate } from '@/utils/DateFormat'
import { formattedValueInput } from '@/utils/priceFormat'

import { OptionTransaction, Transaction } from '@/types/transactionProps'

export const UseRegister = () => {
  const { user } = useUser()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [nameError, setNameError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [optionSelected, setOptionSelected] =
    useState<OptionTransaction | null>(null)
  const [errorOptionSelected, setErrorOptionSelected] = useState('')
  const [optionTransaction, setOptionTransaction] = useState('')
  const [errorOptionTransaction, setErrorOptionTransaction] = useState('')

  const handlePriceChange = (event: string) => {
    const value = formattedValueInput(event.replace(/\D/g, ''))
      .replace(/\./g, '')
      .replace(',', '.')
    setPrice(value)
  }
  const handleSelectOptionCategory = (option: string) => {
    setOptionTransaction(option)
  }

  const handleOptionSelect = (optionName: OptionTransaction) => {
    setOptionSelected(optionName)
  }

  const handleRegisterTransaction = (
    name: string,
    price: string,
    optionTransaction: string,
    optionSelected: OptionTransaction,
  ) => {
    if (!user) return

    const { fullDate, month, year } = formatDate()
    const dataTransaction: Transaction = {
      id: uuid.v4() as string,
      name,
      price,
      categoria: optionTransaction,
      fullDate,
      year,
      month,
      optionTransaction: optionSelected,
    }
    console.log(dataTransaction)

    UserActions.setUserTransactionAction(dataTransaction, user)
  }

  const onSubmit = () => {
    if (!name || !price || !optionTransaction || !optionSelected) {
      if (!name) setNameError('Informe o nome da transação.')
      if (!price || !parseFloat(price.replace(/\D/g, '')))
        setPriceError('Informe o preço da transação.')
      if (!optionTransaction)
        setErrorOptionTransaction('Informe uma categoria.')
      if (!optionSelected) setErrorOptionSelected('Selecione um tipo.')
      return
    }

    if (name.length <= 5) {
      setNameError('O nome deve possui mais de 5 caracteres.')
    }
    handleRegisterTransaction(name, price, optionTransaction, optionSelected)
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
    handleSelectOptionCategory,
    optionTransaction,
    errorOptionTransaction,
    onSubmit,
    optionSelected,
    handleOptionSelect,
    errorOptionSelected,
  }
}
