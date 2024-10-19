import { OptionsIconUser } from '@/types/iconsProps'
import { useState } from 'react'
import { Alert } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '@/services/firebaseConfig'

import User from '@/assets/user.svg'
import Settings from '@/assets/settings.svg'
import Logout from '@/assets/logout.svg'

import { useNavigation } from '@react-navigation/native'

import { StackRouteProps } from '@/routes/stack.route'

export const useUserProfile = () => {
  const navigation = useNavigation<StackRouteProps>()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const handleCloseModal = () => {
    console.log('cancelar')
    setModalIsOpen(false)
  }
  const handleConfirmModal = () => {
    console.log('confirmar')
    handleSignOut()
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro ao sair da conta. Tente novamente mais tarde.')
    }
  }

  const optionsIconsUser: OptionsIconUser[] = [
    {
      name: 'editar perfil',
      icon: User,
      handlePress: () => {
        navigation.navigate('editProfile')
      },
    },
    {
      name: 'configurações',
      icon: Settings,
      handlePress: () => {
        console.log('Abrir configurações')
        // Função específica para configurações
      },
    },
    {
      name: 'sair',
      icon: Logout,
      handlePress: () => {
        setModalIsOpen(true)
      },
    },
  ]

  return {
    modalIsOpen,
    handleCloseModal,
    handleConfirmModal,
    optionsIconsUser,
  }
}
