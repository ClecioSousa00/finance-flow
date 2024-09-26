import { User } from 'firebase/auth'
import { doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { Transaction } from '@/types/transactionProps'

const updateTransactionAccess = async (user: User, data: Transaction) => {
  const transactionsRef = `users/${user.uid}/transactions/${data.year}/transactionsList`
  const transactionDocumentRef = doc(db, transactionsRef, data.id)
  await updateDoc(transactionDocumentRef, data)
}

const addTransactionAccess = async (data: Transaction, user: User) => {
  const transactionsRef = `users/${user.uid}/transactions/${data.year}/transactionsList`
  // const transactionsRef = collection(
  //   db,
  //   `users/${user.uid}/transactions/${data.year}/${data.id}`,
  // )

  await setDoc(doc(db, transactionsRef, data.id), data)
}

export const TransactionAccess = {
  updateTransactionAccess,
  addTransactionAccess,
}
