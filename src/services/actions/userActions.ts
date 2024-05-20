import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { UserAccess } from '../dataAccess/usersAccess'
import { FirebaseError } from 'firebase/app'

type RegisterUserProps = {
  email: string
  password: string
  username: string
}

type LoginUserProps = {
  email: string
  password: string
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

export const UserActions = {
  registerUserAction,
  loginUserAction,
}
