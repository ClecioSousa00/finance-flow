import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { User } from 'firebase/auth'

const usersRef = collection(db, 'users')

type UserInfo = {
  username: string
  user: User
}

type DataDb = {
  price: string
  categoria: string
  fullDate: string
  year: string
  month: string
  name: string
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

const addTransaction = async (data: DataDb, user: User) => {
  const transactionsRef = collection(
    db,
    `users/${user.uid}/transactions/${data.year}/${data.month}`,
  )

  await addDoc(transactionsRef, data)

  console.log('Transação adicionada com sucesso!')
}

export const UserAccess = {
  setUserAccess,
  getUserAccess,
  addTransaction,
}
