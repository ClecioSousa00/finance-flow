import { Avatar, AvatarFallback, AvatarImage } from '@/components/Avatar/Avatar'
import { Button } from '@/components/Button/Button'
import { Container } from '@/components/Container'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TitleScreen } from '@/components/TitleScreen'
import { auth } from '@/services/firebaseConfig'
import { signOut } from 'firebase/auth'
import { View, Text, Alert, Image, TouchableOpacity } from 'react-native'
import User from '@/assets/user.svg'
import { optionsIconsUser } from '@/utils/categorieincons'
import React from 'react'

export const UserProfile = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro ao sair da conta. Tente novamente mais tarde.')
    }
  }
  return (
    <ContainerScreens>
      <HeaderAppScreen className="h-44 justify-start pt-6">
        <TitleScreen title="perfil" />
      </HeaderAppScreen>
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
              SS
            </AvatarFallback>
          </Avatar>
          <Text className=" text-2xl capitalize text-disabled font-bold">
            clécio sousa
          </Text>
        </View>
        <View className="gap-4 mt-14">
          {optionsIconsUser.map((optionIcon, index) => (
            <React.Fragment key={optionIcon.name}>
              <TouchableOpacity
                className="flex-row gap-3 items-center"
                activeOpacity={0.7}
              >
                <View className="bg-blue-dark w-14 h-14 rounded-[18px] justify-center items-center">
                  <optionIcon.icon width={32} />
                </View>
                <Text className="text-disabled text-lg capitalize">
                  {optionIcon.name}
                </Text>
              </TouchableOpacity>
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
