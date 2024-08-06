import { View } from 'react-native'

import { useUser } from '@/contexts/userContext'

import { HeaderAppScreen } from '@/components/HeaderAppScreen'

import { TransactionInfo } from '@/components/TransactionInfo'

import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { UserAccess } from '@/services/dataAccess/usersAccess'
import { Transaction } from '@/services/dataBaseTypes'
import { formatDate } from '@/utils/dataFormat'
import { formatPrice, formattedValueInput } from '@/utils/priceFormat'

import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { DateOptions } from '@/components/DateOptions'
import { DateOptionsProps } from '@/types/dateOptionsProps'
import { Container } from '@/components/Container'
import { TotalBalanceProps } from '@/types/totalBalanceProps'
import { ModalGroup } from '@/components/Modal'
import { InputGroup } from '@/components/Input'
import { Button } from '@/components/Button/Button'

const dateOptions: DateOptionsProps[] = [
  {
    name: 'dia',
    id: '1',
  },
  {
    name: 'semana',
    id: '2',
  },
  {
    name: 'mês',
    id: '3',
  },
]
const initialOptionDateIdSelected = '2'
export const Home = () => {
  const { user, userInfoDb } = useUser()
  const [dataTransactions, setDataTransactions] = useState<Transaction[]>([])
  const [optionDateSelected, setOptionDateSelected] = useState(
    initialOptionDateIdSelected,
  )
  const [totalBalanceTransactions, setTotalBalanceTransactions] = useState(
    {} as TotalBalanceProps,
  )
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [limitBalance, setLimitBalance] = useState('')
  const [percentageLimit, setPercentageLimit] = useState('')
  const { month, year } = formatDate()
  console.log(userInfoDb)

  const getTransaction = useCallback(async () => {
    if (!user) return

    try {
      const dataTransactions = await UserAccess.getTransaction(
        user,
        year,
        month,
      )
      console.log(dataTransactions)

      const transactionsList: Transaction[] = dataTransactions.docs.map(
        (doc) => {
          const data = doc.data() as Transaction
          return {
            name: data.name,
            price: data.price,
            categoria: data.categoria,
            fullDate: data.fullDate,
            year: data.year,
            month: data.month,
            optionTransaction: data.optionTransaction,
          }
        },
      )

      setDataTransactions(transactionsList)
      console.log('get de transações')
    } catch (error) {
      console.log('Erro ao pegar as transações', error)
    }
  }, [user, month, year])

  const totalResume = useCallback(() => {
    const totalRent = dataTransactions.reduce((acc, item) => {
      if (item.optionTransaction === 'renda') {
        return (acc += Number(item.price.replace(/\D/g, '')))
      }
      return acc
    }, 0)
    const totalExpense = dataTransactions.reduce((acc, item) => {
      if (item.optionTransaction === 'despesa') {
        return (acc += Number(item.price.replace(/\D/g, '')))
      }
      return acc
    }, 0)
    setTotalBalanceTransactions({
      totalRent,
      totalExpense,
    })
    console.log('calculou a total')
  }, [dataTransactions])

  const handleOptionDate = (optionId: string) => {
    setOptionDateSelected(optionId)
  }

  const handleModal = () => {
    setModalIsOpen((prevState) => !prevState)
  }

  const handlePriceChange = (event: string) => {
    const value = formattedValueInput(event.replace(/\D/g, ''))
      .replace(/\./g, '')
      .replace(',', '.')
    setLimitBalance(value)
  }

  const calculateExpensesPercentage = (
    totalExpense: string,
    limit: string,
  ): number => {
    const totalSpentNumber = parseFloat(totalExpense.replace(/,/g, '.'))
    const limitNumber = parseFloat(limit.replace(/,/g, '.'))

    const percentage = (totalSpentNumber / limitNumber) * 100
    return Math.round(percentage * 100) / 100
  }

  const formattedExpense = () => {
    const totalExpense = formattedValueInput(
      String(totalBalanceTransactions.totalExpense).replace(/\D/g, ''),
    )
      .replace(/\./g, '')
      .replace(',', '.')
    return totalExpense
  }

  const handleSaveLimit = () => {
    const totalExpense = formattedExpense()

    const percentage = calculateExpensesPercentage(totalExpense, limitBalance)
    setPercentageLimit(`${percentage}%`)
  }

  useLayoutEffect(() => {
    getTransaction()
  }, [getTransaction])

  useEffect(() => {
    if (dataTransactions.length) {
      totalResume()
    }
  }, [dataTransactions, totalResume])

  useEffect(() => {
    if (totalBalanceTransactions.totalExpense) {
      const percentage = calculateExpensesPercentage(
        formattedExpense(),
        limitBalance,
      )
      setPercentageLimit(`${percentage}%`)
    }
  }, [totalBalanceTransactions, limitBalance])

  return (
    <View className="flex-1 bg-secondary">
      <HeaderAppScreen>
        {/* <ProfileAvatar username={userInfoDb.username} /> */}
        <ContainerBalanceInfos
          totalBalanceTransactions={totalBalanceTransactions}
          handleModal={handleModal}
        />
      </HeaderAppScreen>
      <ModalGroup.ModalRoot isOpen={modalIsOpen}>
        <ModalGroup.ModalKeyboard>
          <ModalGroup.ModalContent>
            <ModalGroup.ModalTitle title="limite suas despesas" />
            <InputGroup.InputContent className="mt-6">
              <InputGroup.InputControlled
                placeholder="limite..."
                keyboardAppearance="light"
                keyboardType="decimal-pad"
                value={formattedValueInput(limitBalance.replace(/\D/g, ''))}
                onChangeText={handlePriceChange}
              />
            </InputGroup.InputContent>
            <View className="flex-1 justify-center items-center gap-3 w-full">
              <Button
                label="salvar"
                className="w-2/3"
                onPress={() => handleSaveLimit()}
              />
              <Button
                label="cancelar"
                className="w-2/3"
                variant={'danger'}
                onPress={() => handleModal()}
              />
            </View>
          </ModalGroup.ModalContent>
        </ModalGroup.ModalKeyboard>
      </ModalGroup.ModalRoot>
      {/* <Card total={totalResume()} /> */}
      <Container>
        <DateOptions
          dateOptions={dateOptions}
          handleOptionDate={handleOptionDate}
          optionDateSelected={optionDateSelected}
        />

        {/* <View className="mt-10 flex-row justify-between">
          <Text className="text-lg ">Recentes</Text>
          <TouchableOpacity>
            <Feather name="arrow-right" size={24} color={colors.secondary} />
          </TouchableOpacity>
        </View> */}
        <View className="mt-6 gap-6">
          {dataTransactions.map((item, index) => (
            <React.Fragment key={index}>
              {
                <>
                  <TransactionInfo transaction={item} />
                  {/* {index !== dataTransactions.length - 1 && <LineDivider />} */}
                </>
              }
            </React.Fragment>
          ))}
        </View>
      </Container>
    </View>
  )
}
