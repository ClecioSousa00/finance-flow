import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import { UserActions, UserType } from '@/services/actions/userActions'
import { auth } from '@/services/firebaseConfig'
import { User } from 'firebase/auth'

type UserContextProps = {
  user: User | null
  userInfoDb: UserType
  loading: boolean
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
    const subscriber = auth.onAuthStateChanged(async (userInfo) => {
      setUser(userInfo)

      await getUserInfo()

      setLoading(false)
    })

    return subscriber
  }, [getUserInfo])

  return (
    <UserContext.Provider value={{ user, userInfoDb, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
