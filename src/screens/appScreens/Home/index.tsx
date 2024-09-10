import React from 'react'

import { ActivityIndicator, FlatList, View } from 'react-native'

import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TransactionInfo } from '@/components/TransactionInfo'

import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { DateOptions } from '@/components/DateOptions'
import { Container } from '@/components/Container'
import { ModalLimitRent } from '@/components/ModalLimitRent'

import { UseHome } from './useHome'
import { useCalculateBalanceInfos } from '@/hooks/useCalculateBalanceInfos'
import { ContainerScreens } from '@/components/ContainerScreens'
import { colors } from '@/styles/colors'
import { ModalMessage } from '@/components/ModalMessage'

import { useModalMessageDeleteTransaction } from '@/hooks/useModalMessageDeleteTransaction'

export const Home = () => {
  // const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)
  // const [transactionSelected, setTransactionSelected] =
  //   useState<Transaction | null>(null)

  // const handleConfirmModalDelete = () => {
  //   if (!transactionSelected) return
  //   handleDeleteTransaction(transactionSelected)
  //   setTransactionSelected(null)
  //   setModalDeleteIsOpen(false)
  //   console.log('deletado')
  // }

  // const handleOpenModalDelete = (transaction: Transaction) => {
  //   setModalDeleteIsOpen(true)
  //   setTransactionSelected(transaction)
  // }

  // const handleCloseModalDelete = () => {
  //   setModalDeleteIsOpen(false)
  //   setTransactionSelected(null)
  // }
  const {
    handleCloseModalDelete,
    handleConfirmModalDelete,
    handleOpenModalDelete,
    modalDeleteIsOpen,
  } = useModalMessageDeleteTransaction()

  const {
    handleOptionDate,
    optionDateSelected,
    dateOptions,
    transactionListDate,
    dataTransactions,
    handleDeleteTransaction,
  } = UseHome()

  const {
    handleModal,
    handlePriceChange,
    handleSaveLimit,
    limitBalance,
    modalIsOpen,
    percentageLimit,
    totalBalanceTransactions,
  } = useCalculateBalanceInfos(dataTransactions)
  console.log('renderizou')

  if (!dataTransactions) {
    return (
      <ContainerScreens>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      </ContainerScreens>
    )
  }

  const handleConfirmModal = () => {
    handleConfirmModalDelete(handleDeleteTransaction)
  }
  return (
    <ContainerScreens>
      <HeaderAppScreen>
        <ContainerBalanceInfos
          totalBalanceTransactions={totalBalanceTransactions}
          handleModal={handleModal}
          percentageLimit={percentageLimit}
          limitBalance={limitBalance}
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
        <DateOptions
          dateOptions={dateOptions}
          handleOptionDate={handleOptionDate}
          optionDateSelected={optionDateSelected}
        />
        <FlatList
          className="mt-8"
          data={transactionListDate}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="my-2" />}
          renderItem={({ item }) => (
            <TransactionInfo
              transaction={item}
              handleOpenModal={handleOpenModalDelete}
              key={item.id}
            />
          )}
        />
        {/* <View className="mt-6 gap-6">
          {transactionListDate.map((item) => (
            <TransactionInfo
              transaction={item}
              handleOpenModal={handleOpenModalDelete}
              key={item.id}
            />
          ))}
        </View> */}
      </Container>
    </ContainerScreens>
  )
}
