import { Transaction } from '@/types/transactionProps'
import { useState } from 'react'

export const useModalMessageDeleteTransaction = () => {
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)
  const [transactionSelected, setTransactionSelected] =
    useState<Transaction | null>(null)

  const handleConfirmModalDelete = (
    handleDeleteTransaction: (
      transactionSelected: Transaction,
    ) => Promise<void>,
  ) => {
    if (!transactionSelected) return
    handleDeleteTransaction(transactionSelected)
    setTransactionSelected(null)
    setModalDeleteIsOpen(false)
  }

  const handleOpenModalDelete = (transaction: Transaction) => {
    setModalDeleteIsOpen(true)
    setTransactionSelected(transaction)
  }

  const handleCloseModalDelete = () => {
    setModalDeleteIsOpen(false)
    setTransactionSelected(null)
  }

  return {
    modalDeleteIsOpen,
    handleCloseModalDelete,
    handleConfirmModalDelete,
    handleOpenModalDelete,
    transactionSelected,
    setTransactionSelected,
  }
}
