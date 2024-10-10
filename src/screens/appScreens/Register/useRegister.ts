import { useEffect, useState } from 'react'

import uuid from 'react-native-uuid'

import { useUser } from '@/contexts/userContext'
import { useTransactionContext } from '@/contexts/TransactionContext'

import { TransactionAction } from '@/services/actions/transactionActions'

import { formatDate } from '@/utils/DateFormat'
import { formattedValueInput } from '@/utils/priceFormat'
import { CategoryType } from '@/utils/categorieincons'

import { OptionTransaction, Transaction } from '@/types/transactionProps'

type Props = {
  transaction?: Transaction | null
  handleBottomSheetClose: () => void
}

export const UseRegister = ({ transaction, handleBottomSheetClose }: Props) => {
  const { user } = useUser()
  const { dataTransactions, setDataTransactionsList } = useTransactionContext()

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [nameError, setNameError] = useState('')
  const [priceError, setPriceError] = useState('')
  const [optionSelected, setOptionSelected] =
    useState<OptionTransaction | null>(null)
  const [errorOptionSelected, setErrorOptionSelected] = useState('')
  const [optionTransaction, setOptionTransaction] = useState<CategoryType>('')
  const [errorOptionTransaction, setErrorOptionTransaction] = useState('')
  const [editTransaction, setEditTransaction] = useState(transaction)

  if (transaction && transaction !== editTransaction) {
    console.log('entrou')

    setName(transaction.name)
    setPrice(transaction.price)
    setOptionSelected(transaction.optionTransaction)
    setOptionTransaction(transaction.categoria as CategoryType)
    setEditTransaction(transaction)
  }

  const handlePriceChange = (event: string) => {
    const value = formattedValueInput(event.replace(/\D/g, ''))
      .replace(/\./g, '')
      .replace(',', '.')
    setPrice(value)
  }
  const handleSelectOptionCategory = (option: CategoryType) => {
    setOptionTransaction(option)
  }

  const handleOptionSelect = (optionName: OptionTransaction) => {
    setOptionSelected(optionName)
  }

  const handleCleanForm = () => {
    setName('')
    setPrice('')
    setOptionSelected(null)
    setOptionTransaction('')
  }

  const handleRegisterTransaction = async (
    name: string,
    price: string,
    optionTransaction: CategoryType,
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
    const resp = await TransactionAction.SetUserTransactionAction(
      dataTransaction,
      user,
    )
    if (resp.response === 'success') {
      setDataTransactionsList([...(dataTransactions || []), dataTransaction])
    }
  }

  const onSubmit = async () => {
    // Validação inicial dos campos
    if (!name || !price || !optionTransaction || !optionSelected) {
      if (!name) setNameError('Informe o nome da transação.')
      if (!price || !parseFloat(price.replace(/\D/g, '')))
        setPriceError('Informe o preço da transação.')
      if (!optionTransaction)
        setErrorOptionTransaction('Informe uma categoria.')
      if (!optionSelected) setErrorOptionSelected('Selecione um tipo.')
      return
    }

    if (name.length <= 3) {
      setNameError('O nome deve possuir mais de 3 caracteres.')
      return
    }

    // Se for uma transação existente, atualiza
    if (transaction && user) {
      const data: Transaction = {
        ...transaction,
        name,
        price,
        optionTransaction: optionSelected,
        categoria: optionTransaction,
      }

      try {
        const resp = await TransactionAction.UpdateTransactionAction(user, data)

        if (resp.response === 'success' && dataTransactions) {
          const updatedTransactions = dataTransactions.map((item) => {
            if (item.id === data.id) {
              return {
                ...item,
                name,
                price,
                optionTransaction: optionSelected,
                categoria: optionTransaction,
              }
            }
            return item
          })
          // Atualiza o estado das transações se necessário
          setDataTransactionsList(updatedTransactions)
          handleCleanForm()
          handleBottomSheetClose()
        }
      } catch (error) {
        console.error('Erro ao atualizar transação:', error)
      }
      return
    }

    // TODO: adicionar load no confirm e esta funcao deve retirnar succes ou error para limpar o form
    handleRegisterTransaction(name, price, optionTransaction, optionSelected)
    handleCleanForm()
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
