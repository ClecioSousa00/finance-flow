import { Image, Text, View } from 'react-native'
import { Button } from '@/components/Button/Button'
import { useOnboardingScreen } from './useOnboandingScreen'
import { ContainerScreens } from '@/components/ContainerScreens'

export const Onboarding = () => {
  const {
    dataScreen,
    handleNextStep,
    lastStep,
    navigateLoginScreen,
    onboardingScreenIndex,
    onboardingSteps,
  } = useOnboardingScreen()

  return (
    <ContainerScreens>
      <View className="flex-1 items-center justify-end">
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
            className={`w-32 ${lastStep ? 'hidden' : ''}`}
          />
          <Button
            onPress={handleNextStep}
            activeOpacity={0.7}
            label={`${lastStep ? 'Começar' : 'Próximo'}`}
            className={`${lastStep ? 'w-full' : 'w-64'}`}
          />
        </View>
      </View>
    </ContainerScreens>
  )
}
