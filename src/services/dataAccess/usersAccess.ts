import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { User } from 'firebase/auth'
import { Transaction } from '../dataBaseTypes'

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

const addTransaction = async (data: Transaction, user: User) => {
  const transactionsRef = collection(
    db,
    `users/${user.uid}/transactions/${data.year}/${data.month}`,
  )

  await addDoc(transactionsRef, data)

  console.log('Transação adicionada com sucesso!')
}

const getTransaction = async (user: User, year: string, month: string) => {
  const transactionsRef = collection(
    db,
    'users',
    user.uid,
    'transactions',
    year,
    month,
  )
  const docSnap = await getDocs(transactionsRef)

  return docSnap
}

export const UserAccess = {
  setUserAccess,
  getUserAccess,
  addTransaction,
  getTransaction,
}
