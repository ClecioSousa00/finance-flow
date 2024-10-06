import React, { useState } from 'react'
import { View, Text, Alert } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { StackRouteProps } from '@/routes/stack.route'

import { SvgProps } from 'react-native-svg'

import { signOut } from 'firebase/auth'
import { auth } from '@/services/firebaseConfig'

import { Avatar, AvatarFallback } from '@/components/Avatar/Avatar'
import { Container } from '@/components/Container'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TitleScreen } from '@/components/TitleScreen'
import { ButtonUserOptions } from '@/components/ButtonUserOptions'
import { ModalMessage } from '@/components/ModalMessage'

import User from '@/assets/user.svg'
import Settings from '@/assets/settings.svg'
import Logout from '@/assets/logout.svg'

export type OptionsIconUser = {
  name: string
  icon: React.FC<SvgProps>
  handlePress: () => void // Função específica de cada item
}

export const UserProfile = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const navigation = useNavigation<StackRouteProps>()
  // const { user, userInfoDb } = useUser()
  // console.log(user)
  // console.log('=================================')
  // console.log(userInfoDb)

  const handleCloseModal = () => {
    console.log('cancelar')
    setModalIsOpen(false)
  }
  const handleConfirmModal = () => {
    console.log('confirmar')
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
  return (
    <ContainerScreens>
      <HeaderAppScreen className="mb-20">
        <TitleScreen title="perfil" />
      </HeaderAppScreen>
      <ModalMessage
        modalIsOpen={modalIsOpen}
        titleModal="encerrar sessão"
        subTitleModal="Tem certeza de que deseja sair ?"
        handleCloseModal={handleCloseModal}
        handleConfirmModal={handleConfirmModal}
      />
      <Container>
        {/* <Image source={UserImage} alt="" width={40} /> */}
        <View className="items-center -mt-24 gap-3">
          <Avatar className="bg-primary-Light w-32 h-32">
            {/* <AvatarImage
              source={{
                uri: 'https://avatars.githubusercontent.com/u/123471873?s=96&v=4',
              }}
            /> */}
            <AvatarFallback textClassname="text-3xl text-disabled font-bold">
              cl
            </AvatarFallback>
          </Avatar>
          <Text className=" text-2xl capitalize text-secondary-dark font-bold">
            clécio sousa
          </Text>
        </View>
        <View className="gap-4 mt-14">
          {optionsIconsUser.map((optionIcon, index) => (
            <React.Fragment key={index}>
              <ButtonUserOptions
                name={optionIcon.name}
                icon={optionIcon.icon}
                handlePress={optionIcon.handlePress}
              />
              {index !== optionsIconsUser.length - 1 && (
                <View className="h-[1px] bg-disabled/20" />
              )}
            </React.Fragment>
          ))}
          {/* <View className="bg-blue-dark w-14 h-14 rounded-[18px] justify-center items-center">
            <User width={32} />
          </View> */}
        </View>
      </Container>
    </ContainerScreens>
  )
}
