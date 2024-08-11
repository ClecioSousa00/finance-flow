import { Container } from '@/components/Container'
import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { ModalLimitRent } from '@/components/ModalLimitRent'
import { TitleScreen } from '@/components/TitleScreen'
import { useUser } from '@/contexts/userContext'
import { useCalculateBalanceInfos } from '@/hooks/useCalculateBalanceInfos'
import { UserActions } from '@/services/actions/userActions'
import { UserAccess } from '@/services/dataAccess/usersAccess'
import { Transaction } from '@/services/dataBaseTypes'
import { formatDate } from '@/utils/DateFormat'

import { useCallback, useEffect, useState } from 'react'
import { View, Text } from 'react-native'

export const Balance = () => {
  const { user } = useUser()
  const [transactionListDate, setTransactionListDate] = useState<Transaction[]>(
    [],
  )
  const [dataTransactions, setDataTransactions] = useState<Transaction[]>([])
  const {
    handleModal,
    handlePriceChange,
    handleSaveLimit,
    limitBalance,
    modalIsOpen,
    percentageLimit,
    totalBalanceTransactions,
  } = useCalculateBalanceInfos(dataTransactions)

  console.log('screen Balance', totalBalanceTransactions)

  const getTransaction = useCallback(async () => {
    if (!user) return
    const { month, year } = formatDate()
    console.log('ano', year)

    try {
      const dataTransaction = await UserActions.getTransactionAction(
        user,
        year,
        month,
      )
      console.log('balance transaction', dataTransaction)

      setDataTransactions(dataTransaction)
    } catch (error) {}

    // try {
    //   const dataTransactions = await UserAccess.getTransaction(
    //     user,
    //     year,
    //   )
    //   console.log(dataTransactions)

    //   const transactionsList: Transaction[] = dataTransactions.docs.map(
    //     (doc) => {
    //       const data = doc.data() as Transaction
    //       return {
    //         name: data.name,
    //         price: data.price,
    //         categoria: data.categoria,
    //         fullDate: data.fullDate,
    //         year: data.year,
    //         month: data.month,
    //         optionTransaction: data.optionTransaction,
    //       }
    //     },
    //   )

    //   setDataTransactions(transactionsList)

    //   console.log('get de transações')
    // } catch (error) {
    //   console.log('Erro ao pegar as transações', error)
    // }
  }, [user])

  useEffect(() => {
    getTransaction()
  }, [getTransaction])

  console.log(dataTransactions)

  return (
    <ContainerScreens>
      <View className="flex-1">
        <HeaderAppScreen>
          <TitleScreen title="balanço anual" />
          <ContainerBalanceInfos
            handleModal={handleModal}
            limitBalance={limitBalance}
            percentageLimit={percentageLimit}
            totalBalanceTransactions={totalBalanceTransactions}
          />
        </HeaderAppScreen>
        <ModalLimitRent
          handleModal={handleModal}
          handlePriceChange={handlePriceChange}
          handleSaveLimit={handleSaveLimit}
          limitBalance={limitBalance}
          modalIsOpen={modalIsOpen}
        />
        <Container>
          <Text></Text>
        </Container>
      </View>
    </ContainerScreens>
  )
}
