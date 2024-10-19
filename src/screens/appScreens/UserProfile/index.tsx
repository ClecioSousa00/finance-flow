import React from 'react'
import { View, Text } from 'react-native'

import { Avatar, AvatarFallback } from '@/components/Avatar/Avatar'
import { Container } from '@/components/Container'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TitleScreen } from '@/components/TitleScreen'
import { ButtonUserOptions } from '@/components/ButtonUserOptions'
import { ModalMessage } from '@/components/ModalMessage'

import { useUser } from '@/contexts/userContext'
import { useUserProfile } from './useUserProfile'
import { getInitialName } from '@/utils/getInitialName'

export const UserProfile = () => {
  const { userInfoDb } = useUser()
  const {
    handleCloseModal,
    handleConfirmModal,
    modalIsOpen,
    optionsIconsUser,
  } = useUserProfile()

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
              {getInitialName(userInfoDb.username)}
            </AvatarFallback>
          </Avatar>
          <Text className=" text-2xl capitalize text-secondary-dark font-bold">
            {userInfoDb.username}
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
