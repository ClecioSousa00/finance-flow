import { User } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { Transaction } from '@/types/transactionProps'

const updateTransactionAccess = async (user: User, data: Transaction) => {
  const transactionsRef = `users/${user.uid}/transactions/${data.year}/transactionsList`
  const transactionDocumentRef = doc(db, transactionsRef, data.id)
  await updateDoc(transactionDocumentRef, data)
}

export const TransactionAccess = {
  updateTransactionAccess,
}
