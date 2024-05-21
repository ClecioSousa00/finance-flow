import { ContainerScreens } from '@/components/ContainerScreens'
import { Image, Text, View } from 'react-native'
import imgEmailSent from '@/assets/emailSent.png'
import { Button } from '@/components/Button/Button'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AuthRouteProps } from '@/routes/auth.route'

type ParamsProps = {
  email: string
}

export const EmailSent = () => {
  const navigation = useNavigation<AuthRouteProps>()
  const route = useRoute()
  const { email } = route.params as ParamsProps
  return (
    <ContainerScreens>
      <Image
        source={imgEmailSent}
        alt="Imagem de uma carta"
        className="mt-20"
      />
      <Text className="font-poppins-semiBold text-2xl text-center">
        Seu e-mail está a caminho
      </Text>
      <Text className="text-gray-600 text-center mt-6">
        {` Verifique seu e-mail ${email} e siga as instruções para redefinir
        sua senha`}
      </Text>
      <View className="flex-1 justify-end mb-6">
        <Button
          label="Voltar ao Login"
          onPress={() => navigation.navigate('login')}
        />
      </View>
    </ContainerScreens>
  )
}
