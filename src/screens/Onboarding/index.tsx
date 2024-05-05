import { Text, View } from 'react-native'
import OnboardingFirstStep from '@/assets/onboardingFirstStep.svg'
import { Button } from '@/components/Button'

export const Onboarding = () => {
  return (
    <View className="flex-1 bg-primary items-center justify-center">
      <OnboardingFirstStep />
      <View className="mt-[88px] flex-row gap-[6px]">
        <View className="w-9 h-2  rounded-md bg-secondary"></View>
        <View className="w-9 h-2  rounded-md bg-white"></View>
        <View className="w-9 h-2  rounded-md bg-white"></View>
      </View>
      <Text className="font-poppins-semiBold text-white text-4xl text-center">
        Bem-vindo ao seu novo assistente financeiro pessoal!
      </Text>
      <Button label="Próximo" className="w-full rounded-full" />
    </View>
  )
}
