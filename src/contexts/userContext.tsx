import { UserActions, UserType } from '@/services/actions/userActions'
import { auth } from '@/services/firebaseConfig'
import { User } from 'firebase/auth'

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type UserContextProps = {
  user: User | null
  userInfoDb: UserType
}

const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [userInfoDb, setUserInfoDb] = useState({} as UserType)
  const [loading, setLoading] = useState(true)

  const getUserInfo = useCallback(async () => {
    if (user) {
      const userInfoData = await UserActions.getUserAction(user)
      setUserInfoDb(userInfoData ?? ({} as UserType))
    }
  }, [user])

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((userInfo) => {
      setUser(userInfo)
      setLoading(false)
    })
    return subscriber
  }, [])

  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  if (loading) return null

  return (
    <UserContext.Provider value={{ user, userInfoDb }}>
      {children}
    </UserContext.Provider>
  )
}
export const useUser = () => useContext(UserContext)
