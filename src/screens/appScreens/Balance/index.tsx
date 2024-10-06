import {
  ActivityIndicator,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import BottomSheet from '@gorhom/bottom-sheet'
import Ionicons from '@expo/vector-icons/Ionicons'

import { Register } from '@/screens/appScreens/Register'

import { Container } from '@/components/Container'
import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { ModalLimitRent } from '@/components/ModalLimitRent'
import { TransactionInfo } from '@/components/TransactionInfo'
import { ModalMessage } from '@/components/ModalMessage'
import { ButtonLabel } from '@/components/ButtonLabel'

import { useTransactionContext } from '@/contexts/TransactionContext'

import { useCalculateBalanceInfos } from '@/hooks/useCalculateBalanceInfos'
import { useModalMessageDeleteTransaction } from '@/hooks/useModalMessageDeleteTransaction'

import { categories } from '@/utils/categorieincons'

import { colors } from '@/styles/colors'

import { useBalance } from './useBalance'
import { TitleScreen } from '@/components/TitleScreen'

export const Balance = () => {
  const { dataTransactions, setDataTransactionsList } = useTransactionContext()

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

  const {
    bottomSheet,
    filterTransaction,
    groupedTransactions,
    handleConfirmModal,
    handleEditTransaction,
  } = useBalance({
    handleConfirmModalDelete,
    setTransactionSelected,
    dataTransactions,
    setDataTransactionsList,
  })

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
        <HeaderAppScreen className="gap-3 ">
          <TitleScreen title="resumo" />
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
        <Container className="px-2 pt-4">
          <View className="flex-row gap-2 justify-center mb-6 flex-wrap ">
            {filterTransaction.filterListSelected.length > 0 &&
              filterTransaction.filterListSelected.map((filterName) => (
                <ButtonLabel
                  label={filterName}
                  key={filterName}
                  onPress={() =>
                    filterTransaction.handleRemoveFilter(filterName)
                  }
                >
                  <Ionicons name="close" size={14} color={colors.primary} />
                </ButtonLabel>
              ))}
          </View>
          <View className="pb-36 px-7">
            <TouchableOpacity
              className="items-end"
              onPress={bottomSheet.handleBottomSheetFilterOpen}
            >
              <Ionicons
                name="filter-outline"
                size={24}
                color={colors.disabled}
              />
            </TouchableOpacity>

            {groupedTransactions.length &&
            (filterTransaction.filterGroupedTransactions().length ||
              !filterTransaction.filterListSelected.length) ? (
              <SectionList
                sections={
                  filterTransaction.filterListSelected.length
                    ? filterTransaction.filterGroupedTransactions()
                    : groupedTransactions
                }
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TransactionInfo
                    transaction={item}
                    handleOpenModal={handleOpenModalDelete}
                    handleEditTransaction={handleEditTransaction}
                  />
                )}
                renderSectionHeader={({ section }) => (
                  <Text className="mb-4 capitalize font-poppins-semiBold text-xl text-secondary-dark">
                    {section.title}
                  </Text>
                )}
                ItemSeparatorComponent={() => <View className="my-2" />}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View className="items-center justify-center h-64">
                <Text className="text-disabled text-2xl text-center capitalize">
                  Nenhuma transação encontrada
                </Text>
              </View>
            )}
          </View>
        </Container>

        <BottomSheet
          ref={bottomSheet.bottomSheetRef}
          snapPoints={[0.01, 630]}
          handleComponent={() => null}
        >
          <Register
            editScreen
            transaction={transactionSelected}
            handleBottomSheetClose={bottomSheet.handleBottomSheetClose}
          />
        </BottomSheet>
        <BottomSheet
          ref={bottomSheet.bottomSheetRefFilter}
          snapPoints={[0.01, 550]}
          handleComponent={() => null}
          backgroundStyle={{ backgroundColor: 'transparent' }}
        >
          <Container className="pt-7">
            <TouchableOpacity
              className="items-end mb-5"
              onPress={bottomSheet.handleBottomSheetFilterClose}
            >
              <Ionicons
                name="close"
                size={24}
                color={colors['secondary-dark']}
              />
            </TouchableOpacity>
            <View className="flex-row gap-4 justify-center mb-6 flex-wrap ">
              {Object.entries(categories).map(([key]) => {
                if (!key) return null
                return (
                  <ButtonLabel
                    label={key}
                    key={key}
                    disabled={filterTransaction.filterListSelected.includes(
                      key,
                    )}
                    selected={filterTransaction.filterListSelected.includes(
                      key,
                    )}
                    onPress={() => filterTransaction.handleAddFilter(key)}
                  />
                )
              })}
            </View>
          </Container>
        </BottomSheet>
      </View>
    </ContainerScreens>
  )
}
