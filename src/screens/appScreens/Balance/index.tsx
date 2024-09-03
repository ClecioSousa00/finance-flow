import { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'

import { Container } from '@/components/Container'
import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { ModalLimitRent } from '@/components/ModalLimitRent'
import { TitleScreen } from '@/components/TitleScreen'
import { TransactionInfo } from '@/components/TransactionInfo'
import { useUser } from '@/contexts/userContext'

import { useCalculateBalanceInfos } from '@/hooks/useCalculateBalanceInfos'

import { UserActions } from '@/services/actions/userActions'
import { Transaction } from '@/services/dataBaseTypes'

import { formatDate } from '@/utils/DateFormat'

export const Balance = () => {
  const { user } = useUser()

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
    const { year } = formatDate()
    console.log('ano', year)

    const dataTransaction = await UserActions.getTransactionAction(user, year)

    setDataTransactions(dataTransaction)
  }, [user])

  useEffect(() => {
    getTransaction()
  }, [getTransaction])

  console.log(dataTransactions)

  return (
    <ContainerScreens>
      <View className="flex-1">
        <HeaderAppScreen className="mt-5">
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
          <View className="mt-6 gap-6">
            {dataTransactions.map((item, index) => (
              <TransactionInfo transaction={item} key={index} />
            ))}
          </View>
        </Container>
      </View>
    </ContainerScreens>
  )
}
