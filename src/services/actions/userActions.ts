import {
  User,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { UserAccess } from '../dataAccess/usersAccess'
import { FirebaseError } from 'firebase/app'
import { Transaction } from '../dataBaseTypes'

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

const setUserTransactionAction = async (data: Transaction, user: User) => {
  try {
    await UserAccess.addTransaction(data, user)
  } catch (error) {
    console.log('erro ao criar transação', error)
  }
}

export const UserActions = {
  registerUserAction,
  loginUserAction,
  forgotPasswordUserAction,
  getUserAction,
  setUserTransactionAction,
}
