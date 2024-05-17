import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { User } from 'firebase/auth'

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

export const UserAccess = {
  setUserAccess,
}
