import React, { useRef } from 'react'

import { FlatList, View } from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'

import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TransactionInfo } from '@/components/TransactionInfo'
import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { DateOptions } from '@/components/DateOptions'
import { Container } from '@/components/Container'
import { ModalLimitRent } from '@/components/ModalLimitRent'
import { ModalMessage } from '@/components/ModalMessage'
import { ContainerScreens } from '@/components/ContainerScreens'
import { SkeletonBalanceInfos } from '@/components/ContainerBalanceInfos/SkeletonBalanceInfos'
import { SkeletonTransactionInfo } from '@/components/TransactionInfo/SkeletonTransactionInfo'

import { UseHome } from './useHome'

import { useCalculateBalanceInfos } from '@/hooks/useCalculateBalanceInfos'
import { useModalMessageDeleteTransaction } from '@/hooks/useModalMessageDeleteTransaction'

import { Transaction } from '@/types/transactionProps'

import { Register } from '../Register'

export const Home = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const {
    handleCloseModalDelete,
    handleConfirmModalDelete,
    handleOpenModalDelete,
    modalDeleteIsOpen,
    setTransactionSelected,
    transactionSelected,
  } = useModalMessageDeleteTransaction()

  const {
    handleOptionDate,
    optionDateSelected,
    dateOptions,
    transactionListDate,
    dataTransactions,
    handleDeleteTransaction,
    transactionMonth,
  } = UseHome()

  const {
    handleModal,
    handlePriceChange,
    handleSaveLimit,
    limitBalance,
    modalIsOpen,
    percentageLimit,
    totalBalanceTransactions,
  } = useCalculateBalanceInfos(transactionMonth)

  const handleConfirmModal = () => {
    handleConfirmModalDelete(handleDeleteTransaction)
  }

  const handleBottomSheetOpen = () => {
    bottomSheetRef.current?.expand()
  }

  const handleBottomSheetClose = () => {
    bottomSheetRef.current?.close()
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionSelected(transaction)
    handleBottomSheetOpen()
  }

  return (
    <ContainerScreens>
      <HeaderAppScreen className="gap-3 h-72">
        {/* <TitleScreen title="balanço mensal" /> */}
        {!!totalBalanceTransactions.totalExpense ||
        !!totalBalanceTransactions.totalRent ? (
          <ContainerBalanceInfos
            totalBalanceTransactions={totalBalanceTransactions}
            handleModal={handleModal}
            percentageLimit={percentageLimit}
            limitBalance={limitBalance}
            expanseLimit
          />
        ) : (
          <SkeletonBalanceInfos skeletonLimit />
        )}
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
      <Container className="pb-20">
        <DateOptions
          dateOptions={dateOptions}
          handleOptionDate={handleOptionDate}
          optionDateSelected={optionDateSelected}
        />
        {!transactionListDate.length && !dataTransactions && (
          <View className="mt-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonTransactionInfo key={index} className="mb-2" />
            ))}
          </View>
        )}
        {transactionListDate.length > 0 && (
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
                handleEditTransaction={handleEditTransaction}
              />
            )}
          />
        )}
        {/* {!transactionListDate.length && (
          <InfoTransactionEmpty message="nenhuma transação encontrada" />
        )} */}
      </Container>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[0.01, 603]}
        handleComponent={() => null}
      >
        <Register
          editScreen
          transaction={transactionSelected}
          handleBottomSheetClose={handleBottomSheetClose}
        />
      </BottomSheet>
    </ContainerScreens>
  )
}
