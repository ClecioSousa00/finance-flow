import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { User } from 'firebase/auth'
import { Transaction } from '@/types/transactionProps'

const usersRef = collection(db, 'users')

type UserInfo = {
  username: string
  user: User
}

const setUserAccess = async ({ username, user }: UserInfo) => {
  await setDoc(doc(usersRef, user.uid), {
    username,
    userId: user.uid,
  })
}

const getUserAccess = async (user: User) => {
  const docRef = doc(db, 'users', user.uid)
  const response = await getDoc(docRef)
  return response
}

// const addTransaction = async (data: Transaction, user: User) => {
//   const transactionsRef = `users/${user.uid}/transactions/${data.year}/transactionsList`
//   // const transactionsRef = collection(
//   //   db,
//   //   `users/${user.uid}/transactions/${data.year}/${data.id}`,
//   // )

//   await setDoc(doc(db, transactionsRef, data.id), data)
// }

const getTransaction = async (user: User, year: string) => {
  const transactionsRef = collection(
    db,
    'users',
    user.uid,
    'transactions',
    year,
    'transactionsList',
  )
  const docSnap = await getDocs(transactionsRef)

  return docSnap
}

const deleteTransactionAccess = async (data: Transaction, user: User) => {
  const transactionsRef = `users/${user.uid}/transactions/${data.year}/transactionsList`
  await deleteDoc(doc(db, transactionsRef, data.id))
}

export const UserAccess = {
  setUserAccess,
  getUserAccess,
  // addTransaction,
  getTransaction,
  deleteTransactionAccess,
}
