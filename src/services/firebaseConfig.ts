import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_API_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_API_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_API_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_API_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_API_APPID,
}

const app = initializeApp(firebaseConfig)

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
})
export const db = getFirestore(app)
