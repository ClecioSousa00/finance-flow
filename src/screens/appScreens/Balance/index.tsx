import { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, SectionList, Text, View } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'

import { Container } from '@/components/Container'
import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { ModalLimitRent } from '@/components/ModalLimitRent'
import { TitleScreen } from '@/components/TitleScreen'
import { TransactionInfo } from '@/components/TransactionInfo'
import { ModalMessage } from '@/components/ModalMessage'

import { useUser } from '@/contexts/userContext'

import { useCalculateBalanceInfos } from '@/hooks/useCalculateBalanceInfos'
import { useModalMessageDeleteTransaction } from '@/hooks/useModalMessageDeleteTransaction'

import { UserActions } from '@/services/actions/userActions'

import { formatDate } from '@/utils/DateFormat'
import { groupedTransactionsMonths } from '@/utils/groupedTransactionsMonths'

import { GroupedTransaction, Transaction } from '@/types/transactionProps'

import { colors } from '@/styles/colors'
import { Register } from '../Register'

export const Balance = () => {
  const { user } = useUser()

  const [dataTransactions, setDataTransactions] = useState<Transaction[]>([])
  const [groupedTransactions, setGroupedTransactions] = useState<
    GroupedTransaction[]
  >([])

  const bottomSheetRef = useRef<BottomSheet>(null)

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
    setTransactionSelected,
    transactionSelected,
  } = useModalMessageDeleteTransaction()

  const handleDeleteTransaction = async (transactionSelected: Transaction) => {
    if (!dataTransactions) return

    await UserActions.deleteTransactionAction(transactionSelected, user)

    const filterTransaction = dataTransactions.filter(
      (item) => item.id !== transactionSelected.id,
    )

    const filterGroupedTransactions = groupedTransactions.map((item) => ({
      title: item.title,
      data: item.data.filter(
        (userTransaction) => userTransaction.id !== transactionSelected.id,
      ),
    }))

    setGroupedTransactions(filterGroupedTransactions)
    setDataTransactions(filterTransaction)
  }

  const handleConfirmModal = () => {
    handleConfirmModalDelete(handleDeleteTransaction)
  }

  const handleBottomSheetOpen = () => {
    bottomSheetRef.current?.expand()
  }

  const handleBottomSheetClose = () => {
    console.log('close bottmo', bottomSheetRef.current?.close())
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionSelected(transaction)
    handleBottomSheetOpen()
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

  // useEffect(() => {
  //   if (openSheetIsReady) {
  //     handleBottomSheetOpen()
  //   }
  // }, [openSheetIsReady])

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
            <SectionList
              sections={groupedTransactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TransactionInfo
                  transaction={item}
                  handleOpenModal={handleOpenModalDelete}
                  handleEditTransaction={handleEditTransaction}
                />
              )}
              renderSectionHeader={({ section }) => (
                <Text className="my-4 capitalize font-poppins-semiBold text-xl text-secondary-dark">
                  {section.title}
                </Text>
              )}
              ItemSeparatorComponent={() => <View className="my-2" />}
              showsVerticalScrollIndicator={false}
            />

            {/* <FlatList
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
            /> */}
          </View>
        </Container>

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[0.01, 630]}
          handleComponent={() => null}
        >
          <Register
            editScreen
            transaction={transactionSelected}
            handleBottomSheetClose={handleBottomSheetClose}
          />
        </BottomSheet>
      </View>
    </ContainerScreens>
  )
}
