import { Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'

import { colors } from '@/styles/colors'

import { Avatar, AvatarFallback } from '@/components/Avatar/Avatar'
import { Container } from '@/components/Container'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TitleScreen } from '@/components/TitleScreen'
import { InputGroup } from '@/components/Input'
import { InputLabel } from '@/components/Input/InputLabel'

export const EditProfile = () => {
  const navigation = useNavigation()
  return (
    <ContainerScreens>
      <HeaderAppScreen className="mb-20 px-4">
        <View className="relative w-full ">
          <TouchableOpacity
            className="absolute left-0 w-10 z-10"
            onPress={() => navigation.goBack()}
          >
            <Feather name="arrow-left" size={24} color={colors.primary} />
          </TouchableOpacity>
          <TitleScreen title="editar perfil" />
        </View>
      </HeaderAppScreen>
      <Container>
        <View className="items-center -mt-24 gap-3 ">
          <View className="relative">
            <Avatar className="bg-primary-Light w-32 h-32">
              {/* <AvatarImage
                source={{
                  uri: 'https://avatars.githubusercontent.com/u/123471873?s=96&v=4',
                }}
              /> */}
              <AvatarFallback textClassname="text-3xl text-disabled font-poppins-semiBold">
                cs
              </AvatarFallback>
            </Avatar>
            <TouchableOpacity
              className=" bg-secondary p-2 rounded-full absolute bottom-1 right-1"
              activeOpacity={0.7}
            >
              <Feather
                name="camera"
                size={18}
                color={colors['secondary-dark']}
              />
            </TouchableOpacity>
          </View>
          <Text className=" text-2xl capitalize text-secondary-dark font-poppins-semiBold">
            clécio sousa
          </Text>
        </View>
        <Text className="text-lg text-secondary-dark capitalize mt-12  font-poppins-semiBold">
          detalhes da conta
        </Text>
        <InputGroup.InputRoot className="gap-6 mt-6">
          <View>
            <InputLabel label="username" />
            <InputGroup.InputContent>
              <InputGroup.InputControlled placeholder="username" />
            </InputGroup.InputContent>
          </View>

          <View>
            <InputLabel label="email" />
            <InputGroup.InputContent>
              <InputGroup.InputControlled placeholder="email" />
            </InputGroup.InputContent>
          </View>
        </InputGroup.InputRoot>
      </Container>
    </ContainerScreens>
  )
}
