import { Image, Text, View } from 'react-native'
import { Button } from '@/components/Button'
import { useState } from 'react'
import onboardingFirstStep from '../../assets/onboardingFirstStep.png'
import onboardingSecondStep from '../../assets/onboardingSecondStep.png'
import onboardingLastStep from '../../assets/onboardingLastStep.png'

const onboardingSteps = [
  {
    img: onboardingFirstStep,
    title: 'Bem-vindo ao seu novo assistente financeiro pessoal!',
  },
  {
    img: onboardingSecondStep,
    title: 'Controle seus gastos de forma simples e eficaz.',
  },
  {
    img: onboardingLastStep,
    title: 'Entenda para onde vai cada centavo do seu dinheiro.',
  },
]

export const Onboarding = () => {
  const [onboardingScreenIndex, setOnboardingScreenIndex] = useState(0)

  const dataScreen = onboardingSteps[onboardingScreenIndex]
  const lastStep = onboardingScreenIndex === onboardingSteps.length - 1

  const handleNextStep = () => {
    if (lastStep) {
      console.log('mandar o user para tela login')
      return
    }

    setOnboardingScreenIndex((prevState) => prevState + 1)
  }

  const navigateLoginScreen = () => {
    console.log('mandar user para tela de login')
  }

  return (
    <View className="flex-1 items-center justify-end px-4">
      <Image source={dataScreen.img} alt="" />
      <View className="mt-[88px] mb-6 flex-row gap-[6px]">
        {onboardingSteps.map((_, index) => (
          <View
            key={index}
            className={`w-9 h-2 rounded-md  ${index === onboardingScreenIndex ? 'bg-secondary' : 'bg-white'}`}
          />
        ))}
      </View>
      <Text className="font-poppins-semiBold text-white text-4xl text-center">
        {dataScreen.title}
      </Text>
      <View className="my-20 flex-row justify-between w-full">
        <Button
          onPress={navigateLoginScreen}
          activeOpacity={0.7}
          label="Pular"
          variant={'outline'}
          className={`rounded-full w-32 h-14 ${lastStep ? 'hidden' : ''}`}
        />
        <Button
          onPress={handleNextStep}
          activeOpacity={0.7}
          label={`${lastStep ? 'Começar' : 'Próximo'}`}
          className={`rounded-full  h-14 ${lastStep ? 'w-full' : 'w-64'}`}
        />
      </View>
    </View>
  )
}
