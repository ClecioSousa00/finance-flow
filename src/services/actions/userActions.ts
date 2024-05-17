import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { UserAccess } from '../dataAccess/usersAccess'

type RegisterUserProps = {
  email: string
  password: string
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
    return { success: false, error }
  }
}

export const UserActions = {
  registerUserAction,
}
