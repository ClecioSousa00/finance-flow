import { useCallback, useEffect, useRef, useState } from 'react'
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
import { TitleScreen } from '@/components/TitleScreen'
import { TransactionInfo } from '@/components/TransactionInfo'
import { ModalMessage } from '@/components/ModalMessage'
// import * as DropDownCn from '@/components/DropDown/DropDown'

import { useUser } from '@/contexts/userContext'
import { useTransactionContext } from '@/contexts/TransactionContext'

import { useCalculateBalanceInfos } from '@/hooks/useCalculateBalanceInfos'
import { useModalMessageDeleteTransaction } from '@/hooks/useModalMessageDeleteTransaction'

import { UserActions } from '@/services/actions/userActions'

import { groupedTransactionsMonths } from '@/utils/groupedTransactionsMonths'

import { GroupedTransaction, Transaction } from '@/types/transactionProps'

import { colors } from '@/styles/colors'

import { ButtonLabel } from '@/components/ButtonLabel'
import { categories } from '@/utils/categorieincons'

export const Balance = () => {
  const { user } = useUser()

  const { dataTransactions, setDataTransactionsList } = useTransactionContext()
  // const [dataTransactions, setDataTransactions] = useState<Transaction[]>([])
  const [groupedTransactions, setGroupedTransactions] = useState<
    GroupedTransaction[]
  >([])
  const [filterListSelected, setFilterListSelected] = useState<string[]>([])

  const bottomSheetRef = useRef<BottomSheet>(null)
  const bottomSheetRefFilter = useRef<BottomSheet>(null)

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

    // const filterGroupedTransactions = groupedTransactions.map((item) => ({
    //   title: item.title,
    //   data: item.data.filter(
    //     (userTransaction) => userTransaction.id !== transactionSelected.id,
    //   ),
    // }))

    // setGroupedTransactions(filterGroupedTransactions)
    setDataTransactionsList(filterTransaction)
  }

  const handleConfirmModal = () => {
    handleConfirmModalDelete(handleDeleteTransaction)
  }

  const handleBottomSheetFilterOpen = () => {
    bottomSheetRefFilter.current?.expand()
  }

  const handleBottomSheetFilterClose = () => {
    bottomSheetRefFilter.current?.close()
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

  const handleAddFilter = (filterNameSelected: string) => {
    // const filterHasSelected = filterListSelected.find(
    //   (filterName) => filterName === filterNameSelected,
    // )
    // if (filterHasSelected) return
    setFilterListSelected((prev) => [...prev, filterNameSelected])
  }

  const handleRemoveFilter = (filterNameSelected: string) => {
    const filterFilters = filterListSelected.filter(
      (filterName) => filterName !== filterNameSelected,
    )
    setFilterListSelected(filterFilters)
  }

  const groupedTransactionsData = useCallback(() => {
    if (!dataTransactions) return
    console.log('executou get')

    const groupedTransactions = groupedTransactionsMonths(dataTransactions)

    setGroupedTransactions(groupedTransactions)
  }, [dataTransactions])

  useEffect(() => {
    groupedTransactionsData()
  }, [groupedTransactionsData])

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
        <Container className="px-2">
          <View className="flex-row gap-2 justify-center mb-6 flex-wrap ">
            {filterListSelected.length > 0 &&
              filterListSelected.map((filterName) => (
                <ButtonLabel
                  label={filterName}
                  key={filterName}
                  onPress={() => handleRemoveFilter(filterName)}
                >
                  <Ionicons name="close" size={14} color={colors.primary} />
                </ButtonLabel>
              ))}
          </View>
          <View className="pb-20 px-7">
            <TouchableOpacity
              className="items-end"
              onPress={handleBottomSheetFilterOpen}
            >
              <Ionicons
                name="filter-outline"
                size={24}
                color={colors['secondary-dark']}
              />
            </TouchableOpacity>
            {/* <DropDownCn.DropDown>
              <DropDownCn.DropDownTrigger>
                <TouchableOpacity className="items-end">
                  <Ionicons
                    name="filter-outline"
                    size={24}
                    color={colors['secondary-dark']}
                  />
                </TouchableOpacity>
              </DropDownCn.DropDownTrigger>
              <DropDownCn.DropDownContent className="bg-primary-Light">
                <DropDownCn.DropDownItem>
                  <TouchableOpacity className="flex-row items-center">
                    <Text className="text-secondary-dark text-xl">Data</Text>
                    <AntDesign name="arrowup" size={18} color="black" />
                  </TouchableOpacity>
                </DropDownCn.DropDownItem>

                <DropDownCn.DropDownItem>
                  <TouchableOpacity className="flex-row items-center">
                    <Text className="text-secondary-dark text-xl">Data</Text>
                    <AntDesign name="arrowdown" size={18} color="black" />
                  </TouchableOpacity>
                </DropDownCn.DropDownItem>

                <DropDownCn.DropDownItem>
                  <TouchableOpacity className="flex flex-row gap-2 items-center">
                    <Text className="text-primary text-xl">Billing</Text>
                  </TouchableOpacity>
                </DropDownCn.DropDownItem>
                <DropDownCn.DropDownLabel labelTitle="Team" />
                <DropDownCn.DropDownItemSeparator />
                <DropDownCn.DropDownItem>
                  <TouchableOpacity className="flex flex-row gap-2 items-center">
                    <Text className="text-primary text-xl">Billing</Text>
                  </TouchableOpacity>
                </DropDownCn.DropDownItem>
              </DropDownCn.DropDownContent>
            </DropDownCn.DropDown> */}

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
                <Text className="mb-4 capitalize font-poppins-semiBold text-xl text-secondary-dark">
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
        <BottomSheet
          ref={bottomSheetRefFilter}
          snapPoints={[0.01, 540]}
          handleComponent={() => null}
          backgroundStyle={{ backgroundColor: 'transparent' }}
        >
          <Container className="pt-2">
            <TouchableOpacity
              className="items-end mb-5"
              onPress={handleBottomSheetFilterClose}
            >
              <Ionicons
                name="close"
                size={24}
                color={colors['secondary-dark']}
              />
            </TouchableOpacity>
            <View className="flex-row gap-4 justify-center mb-6 flex-wrap ">
              {Object.entries(categories).map(([key]) => (
                <ButtonLabel
                  label={key}
                  key={key}
                  disabled={filterListSelected.includes(key)}
                  selected={filterListSelected.includes(key)}
                  onPress={() => handleAddFilter(key)}
                />
              ))}
            </View>
          </Container>
        </BottomSheet>
      </View>
    </ContainerScreens>
  )
}
