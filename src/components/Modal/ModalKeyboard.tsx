import React from 'react'
import { KeyboardAvoidingView } from 'react-native'

type Props = {
  children: React.ReactNode
}

export const ModalKeyboard = ({ children }: Props) => {
  return (
    <KeyboardAvoidingView
      className="items-center justify-center flex-1 px-3 bg-zinc-900/40"
      behavior="padding"
    >
      {children}
    </KeyboardAvoidingView>
  )
}
