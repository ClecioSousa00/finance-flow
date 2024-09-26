import {
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { UserAccess } from '../dataAccess/usersAccess'
import { FirebaseError } from 'firebase/app'

import Toast from 'react-native-toast-message'
import { Transaction } from '@/types/transactionProps'

type RegisterUserProps = {
  email: string
  password: string
  username: string
}

type LoginUserProps = {
  email: string
  password: string
}

type ForgotPasswordProps = {
  email: string
}

export type UserType = {
  userId: string
  username: string
}

const registerUserAction = async ({
  email,
  password,
  username,
}: RegisterUserProps) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user
    await UserAccess.setUserAccess({ username, user })

    return { success: true, user }
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        success: false,
        errorCode: error.code,
      }
    }
    return { success: false, error }
  }
}

const loginUserAction = async ({ email, password }: LoginUserProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    console.log(userCredential.user)
    const user = userCredential.user
    return { success: true, user }
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        success: false,
        errorCode: error.code,
      }
    }
    return { success: false, error }
  }
}

const forgotPasswordUserAction = async ({ email }: ForgotPasswordProps) => {
  try {
    await sendPasswordResetEmail(auth, email)
    console.log('oi')

    return { success: true }
  } catch (error) {
    if (error instanceof FirebaseError) {
      return {
        success: false,
        errorCode: error.code,
      }
    }
    return { success: false, error }
  }
}

const getUserAction = async (user: User) => {
  try {
    const doc = await UserAccess.getUserAccess(user)
    if (doc.exists()) {
      const data = doc.data() as UserType

      return data
    }
    console.log('No such document!')
  } catch (error) {
    console.log('ERRO ao pegar o usuário', error)
  }
}

// const setUserTransactionAction = async (data: Transaction, user: User) => {
//   try {
//     await UserAccess.addTransaction(data, user)
//     Toast.show({
//       type: 'success',
//       text1: 'Adicionado com sucesso.',
//     })
//     console.log('Transação adicionada com sucesso!')
//   } catch (error) {
//     Toast.show({
//       type: 'error',
//       text1: 'Erro ao fazer o cadastro, tente mais tarde.',
//     })
//     console.log('erro ao criar transação', error)
//   }
// }

const getTransactionAction = async (
  user: User,
  year: string,
  month?: string,
) => {
  try {
    const dataTransactions = await UserAccess.getTransaction(user, year)
    console.log('get de transações')

    if (month) {
      const transactionsList: Transaction[] = dataTransactions.docs
        .filter((doc) => {
          const data = doc.data() as Transaction
          return data.month === month
        })
        .map((doc) => {
          const data = doc.data() as Transaction
          return {
            id: data.id,
            name: data.name,
            price: data.price,
            categoria: data.categoria,
            fullDate: data.fullDate,
            year: data.year,
            month: data.month,
            optionTransaction: data.optionTransaction,
          }
        })

      return transactionsList
    }

    const transactionsList: Transaction[] = dataTransactions.docs.map((doc) => {
      const data = doc.data() as Transaction
      return {
        id: data.id,
        name: data.name,
        price: data.price,
        categoria: data.categoria,
        fullDate: data.fullDate,
        year: data.year,
        month: data.month,
        optionTransaction: data.optionTransaction,
      }
    })

    console.log('get de transações')
    return transactionsList
  } catch (error) {
    console.log('Erro ao pegar as transações', error)
    return [] as Transaction[]
  }
}

const deleteTransactionAction = async (
  data: Transaction,
  user: User | null,
) => {
  if (!user) return
  try {
    await UserAccess.deleteTransactionAccess(data, user)
    Toast.show({
      type: 'success',
      text1: 'Excluído com sucesso.',
    })
  } catch (error) {
    console.log('Erro ao excluir Transação', error)
    Toast.show({
      type: 'error',
      text1: 'Erro ao excluir Transação.',
    })
  }
}

// const getAllTransactionsAction = async (
//   user: User,
//   year: string,
//   month: string,
// ) => {
//   await UserAccess.getAllTransactionsAccess(user, year)
// }

export const UserActions = {
  registerUserAction,
  loginUserAction,
  forgotPasswordUserAction,
  getUserAction,
  // setUserTransactionAction,
  getTransactionAction,
  deleteTransactionAction,
}
