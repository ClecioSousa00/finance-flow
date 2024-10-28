import { Image, Text, View } from 'react-native'

import { useOnboardingScreen } from './useOnboandingScreen'

import { Button } from '@/components/Button/Button'
import { ContainerScreens } from '@/components/ContainerScreens'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { Container } from '@/components/Container'
import Swiper from 'react-native-swiper'

export const Onboarding = () => {
  const {
    swiperRef,
    handleNextStep,
    onboardingSteps,
    setActiveIndex,
    isLastSlide,
  } = useOnboardingScreen()

  return (
    <ContainerScreens>
      <HeaderAppScreen className="h-48">
        <Text className="text-3xl font-poppins-medium text-primary text-center capitalize">
          finance flow
        </Text>
      </HeaderAppScreen>
      <Container>
        <View className="flex-1">
          <Swiper
            ref={swiperRef}
            loop={false}
            dot={<View className="w-3 h-3 mx-1  bg-disabled rounded-full" />}
            activeDot={
              <View className="w-3 h-3 mx-1  bg-secondary rounded-full" />
            }
            onIndexChanged={(index) => setActiveIndex(index)}
          >
            {onboardingSteps.map((item, index) => (
              <View key={index} className="items-center mt-6 flex-1 gap-10">
                <Text className="text-3xl font-poppins-medium text-secondary-dark text-center">
                  {item.title}
                </Text>
                <Image source={item.img} alt="" width={40} />
              </View>
            ))}
          </Swiper>
          {/* <View className="items-center justify-center  flex-1 gap-10">

            <Text className="text-3xl font-poppins-medium text-primary text-center">
              {dataScreen.title}
            </Text>
            <Image source={dataScreen.img} alt="" width={40} />
            <View className="flex-row gap-[6px]">
              {onboardingSteps.map((_, index) => (
                <View
                  key={`onboarding-step-${index}`}
                  style={{
                    backgroundColor:
                      index === onboardingScreenIndex
                        ? colors.secondary
                        : colors.disabled,
                    width: 36,
                    height: 10,
                    borderRadius: 6,
                  }}
                />
              ))}
            </View>
          </View> */}
          <View className=" justify-end w-full pb-14">
            <Button
              onPress={handleNextStep}
              activeOpacity={0.7}
              label={isLastSlide ? 'Começar' : 'Próximo'}
              className="w-full"
            />
          </View>
        </View>
      </Container>
    </ContainerScreens>
  )
}
