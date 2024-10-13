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
import { InfoTransactionEmpty } from '@/components/InfoTransactionEmpty'
import { Loading } from '@/components/Loading'

import { useTransactionContext } from '@/contexts/TransactionContext'

import { useCalculateBalanceInfos } from '@/hooks/useCalculateBalanceInfos'
import { useModalMessageDeleteTransaction } from '@/hooks/useModalMessageDeleteTransaction'

import { categories } from '@/utils/categorieincons'

import { colors } from '@/styles/colors'

import { useBalance } from './useBalance'

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
    dateOrders,
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
  console.log(filterTransaction.filterCategoryList)

  return (
    <ContainerScreens>
      <View className="flex-1">
        <HeaderAppScreen className="gap-3 ">
          {/* <TitleScreen title="resumo" /> */}
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
        <Container className="px-2 pt-8">
          {/* <View className="flex-row px-2 gap-2 justify-center mb-2 flex-wrap ">
            {filterTransaction.filterCategoryList.length > 0 &&
              filterTransaction.filterCategoryList.map((filterName) => (
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
          </View> */}
          <View className="pb-36 px-7">
            <TouchableOpacity
              className="items-end mb-2"
              onPress={bottomSheet.handleBottomSheetFilterOpen}
            >
              <Ionicons
                name="filter-outline"
                size={24}
                color={colors.disabled}
              />
            </TouchableOpacity>
            {!groupedTransactions.length && <Loading />}

            {groupedTransactions.length &&
            (filterTransaction.filterGroupedTransactions().length ||
              !filterTransaction.filterCategoryList.length) ? (
              <SectionList
                sections={
                  filterTransaction.filterCategoryList.length
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
                  <Text className=" my-2 capitalize font-poppins-semiBold text-xl text-secondary-dark">
                    {section.title}
                  </Text>
                )}
                ItemSeparatorComponent={() => <View className="mb-4 " />}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              groupedTransactions.length && (
                <InfoTransactionEmpty message="Nenhuma transação encontrada" />
              )
            )}
          </View>
        </Container>

        <BottomSheet
          ref={bottomSheet.bottomSheetRef}
          snapPoints={[0.01, 600]}
          handleComponent={() => null}
        >
          <Register
            editScreen
            transaction={transactionSelected}
            handleBottomSheetClose={bottomSheet.handleBottomSheetClose}
          />
        </BottomSheet>
        {/* TODO: Adicionar nome categorias na seção.   */}
        {/* TODO: Adicionar ordem por data.   */}
        {/* TODO: Adicionar ordem por valor.   */}
        {/* TODO: Talvez adicionar renda e despesa.   */}
        <BottomSheet
          ref={bottomSheet.bottomSheetRefFilter}
          snapPoints={[0.01, 600]}
          handleComponent={() => null}
          backgroundStyle={{ backgroundColor: 'transparent' }}
        >
          <Container className="pt-7">
            <TouchableOpacity
              className="items-end "
              onPress={bottomSheet.handleBottomSheetFilterClose}
            >
              <Ionicons
                name="close"
                size={24}
                color={colors['secondary-dark']}
              />
            </TouchableOpacity>
            <Text className="mb-5 capitalize font-poppins-medium text-lg text-disabled">
              categoria
            </Text>
            <View className="flex-row gap-4 justify-center mb-6 flex-wrap ">
              {Object.entries(categories).map(([key]) => {
                if (!key) return null
                return (
                  <ButtonLabel
                    label={key}
                    key={key}
                    // disabled={filterTransaction.filterCategoryList.includes(
                    //   key,
                    // )}
                    selected={filterTransaction.filterCategoryList.includes(
                      key,
                    )}
                    onPress={() =>
                      filterTransaction.handleAddFilterCategory(key)
                    }
                  />
                )
              })}
            </View>
            <Text className="mb-5 capitalize font-poppins-medium text-lg text-disabled">
              data
            </Text>
            <View className="flex-row gap-4 justify-center mb-6 flex-wrap ">
              {dateOrders.map((dateOrder, index) => (
                <ButtonLabel
                  key={index}
                  label={dateOrder}
                  selected={filterTransaction.filterDate.includes(dateOrder)}
                  onPress={() =>
                    filterTransaction.handleFilterDateOrder(dateOrder)
                  }
                />
              ))}
            </View>
          </Container>
        </BottomSheet>
      </View>
    </ContainerScreens>
  )
}
