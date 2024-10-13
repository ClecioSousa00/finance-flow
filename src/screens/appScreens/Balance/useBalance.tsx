import { useUser } from '@/contexts/userContext'
import { UserActions } from '@/services/actions/userActions'
import { GroupedTransaction, Transaction } from '@/types/transactionProps'
import { groupedTransactionsMonths } from '@/utils/groupedTransactionsMonths'
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet'
import React, { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  dataTransactions: Transaction[] | null
  setDataTransactionsList: (transactions: Transaction[]) => void
  handleConfirmModalDelete: (
    handleDeleteTransaction: (
      transactionSelected: Transaction,
    ) => Promise<void>,
  ) => void
  setTransactionSelected: React.Dispatch<
    React.SetStateAction<Transaction | null>
  >
}

type FilterDateProps = 'decrescente' | 'crescente'

export const useBalance = ({
  handleConfirmModalDelete,
  setTransactionSelected,
  dataTransactions,
  setDataTransactionsList,
}: Props) => {
  const { user } = useUser()
  const dateOrders: FilterDateProps[] = ['crescente', 'decrescente']

  const [groupedTransactions, setGroupedTransactions] = useState<
    GroupedTransaction[]
  >([])
  const [filterCategoryList, setFilterCategoryList] = useState<string[]>([])
  const [filterDate, setFilterDate] = useState<FilterDateProps>('decrescente')

  const bottomSheetRef = useRef<BottomSheet>(null)
  const bottomSheetRefFilter = useRef<BottomSheet>(null)

  const handleDeleteTransaction = async (transactionSelected: Transaction) => {
    if (!dataTransactions) return

    await UserActions.deleteTransactionAction(transactionSelected, user)

    const filterTransaction = dataTransactions.filter(
      (item) => item.id !== transactionSelected.id,
    )

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

  const handleAddFilterCategory = (filterNameSelected: string) => {
    const alreadySelected = filterCategoryList.includes(filterNameSelected)

    const updatedFilterList = alreadySelected
      ? filterCategoryList.filter(
          (filterName) => filterName !== filterNameSelected,
        )
      : [...filterCategoryList, filterNameSelected]

    setFilterCategoryList(updatedFilterList)
  }

  const handleFilterDateOrder = (dateOrder: FilterDateProps) => {
    console.log(dateOrder)
    setFilterDate(dateOrder)
  }
  // TODO: ordenar
  const orderTransactionsByDate = (dateOrder: FilterDateProps) => {
    console.log(dateOrder)
    console.log(groupedTransactions)
  }

  const handleRemoveFilter = (filterNameSelected: string) => {
    const filterFilters = filterCategoryList.filter(
      (filterName) => filterName !== filterNameSelected,
    )
    setFilterCategoryList(filterFilters)
  }

  const filterGroupedTransactions = () => {
    if (!filterCategoryList.length) return [] as GroupedTransaction[]

    const filterTransactions = groupedTransactions.map((transaction) => {
      console.log('executou a filtragem de dados')

      return {
        title: transaction.title,
        data: transaction.data.filter((item) =>
          filterCategoryList.includes(item.categoria),
        ),
      }
    })
    return filterTransactions.filter((transaction) => transaction.data.length)
  }

  const groupedTransactionsData = useCallback(() => {
    if (!dataTransactions) return
    console.log('agrupando transacoes')

    const groupedTransactions = groupedTransactionsMonths(dataTransactions)

    setGroupedTransactions(groupedTransactions)
  }, [dataTransactions])

  useEffect(() => {
    groupedTransactionsData()
  }, [groupedTransactionsData])

  const bottomSheet = {
    handleBottomSheetOpen,
    handleBottomSheetClose,
    handleBottomSheetFilterOpen,
    handleBottomSheetFilterClose,
    bottomSheetRef,
    bottomSheetRefFilter,
  }

  const filterTransaction = {
    filterCategoryList,
    filterGroupedTransactions,
    filterDate,
    handleAddFilterCategory,
    handleRemoveFilter,
    handleFilterDateOrder,
  }

  return {
    bottomSheet,
    handleConfirmModal,
    handleEditTransaction,
    handleDeleteTransaction,
    groupedTransactions,
    filterTransaction,
    dateOrders,
  }
}
