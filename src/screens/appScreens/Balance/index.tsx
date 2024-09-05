import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

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

import { formatDate } from '@/utils/DateFormat'

import { GroupedTransaction, Transaction } from '@/types/transactionProps'
import { groupedTransactionsMonths } from '@/utils/groupedTransactionsMonths'
import { colors } from '@/styles/colors'
import { ModalMessage } from '@/components/ModalMessage'
import { useModalMessageDeleteTransaction } from '@/hooks/useModalMessageDeleteTransaction'

export const Balance = () => {
  const { user } = useUser()

  const [dataTransactions, setDataTransactions] = useState<Transaction[]>([])
  const [groupedTransactions, setGroupedTransactions] = useState<
    GroupedTransaction[]
  >([])

  const {
    handleModal,
    handlePriceChange,
    handleSaveLimit,
    limitBalance,
    modalIsOpen,
    percentageLimit,
    totalBalanceTransactions,
  } = useCalculateBalanceInfos(dataTransactions)

  const {
    handleCloseModalDelete,
    handleConfirmModalDelete,
    handleOpenModalDelete,
    modalDeleteIsOpen,
  } = useModalMessageDeleteTransaction()

  const handleDeleteTransaction = async (transactionSelected: Transaction) => {
    if (!dataTransactions) return

    await UserActions.deleteTransactionAction(transactionSelected, user)

    const filterTransaction = dataTransactions.filter(
      (item) => item.id !== transactionSelected.id,
    )

    const filterGroupedTransactions = groupedTransactions.map((item) => ({
      month: item.month,
      transactions: item.transactions.filter(
        (userTransaction) => userTransaction.id !== transactionSelected.id,
      ),
    }))

    setGroupedTransactions(filterGroupedTransactions)
    setDataTransactions(filterTransaction)
  }

  const handleConfirmModal = () => {
    handleConfirmModalDelete(handleDeleteTransaction)
  }

  const getTransaction = useCallback(async () => {
    if (!user) return
    const { year } = formatDate()
    console.log('ano', year)

    const dataTransaction = await UserActions.getTransactionAction(user, year)

    const groupedTransactions = groupedTransactionsMonths(dataTransaction)

    setDataTransactions(dataTransaction)
    setGroupedTransactions(groupedTransactions)
  }, [user])

  useEffect(() => {
    getTransaction()
  }, [getTransaction])

  if (!dataTransactions) {
    return (
      <ContainerScreens>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      </ContainerScreens>
    )
  }

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
        <ModalMessage
          modalIsOpen={modalDeleteIsOpen}
          titleModal="deletar"
          subTitleModal="tem certeza de que deseja deletar esta transação?"
          handleCloseModal={handleCloseModalDelete}
          handleConfirmModal={handleConfirmModal}
        />
        <Container>
          <View className="mt-6 gap-6 pb-20">
            <FlatList
              data={groupedTransactions}
              keyExtractor={(item) => item.month}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View>
                  <Text className="my-4 capitalize font-poppins-semiBold text-xl text-secondary-dark">
                    {item.month}
                  </Text>
                  <FlatList
                    data={item.transactions}
                    keyExtractor={(transaction) => transaction.id}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="my-2" />}
                    renderItem={({ item: transaction }) => (
                      <TransactionInfo
                        transaction={transaction}
                        handleOpenModal={handleOpenModalDelete}
                      />
                    )}
                  />
                </View>
              )}
            />
          </View>
        </Container>
      </View>
    </ContainerScreens>
  )
}
