import { HeaderAppScreen } from '@/components/HeaderAppScreen'

import { View, Text } from 'react-native'
import { UseRegister } from './useRegister'
import { InputGroup } from '@/components/Input'
import { Button } from '@/components/Button/Button'

export const Register = () => {
  const { control, errors, handleSubmit } = UseRegister()

  return (
    <View className="flex-1">
      <HeaderAppScreen>
        <View className="justify-center items-center h-full">
          <Text className="text-2xl">Cadastro</Text>
        </View>
      </HeaderAppScreen>

      <View className="px-4 mt-20">
        <InputGroup.InputRoot className=" gap-4 ">
          <InputGroup.InputContent>
            <InputGroup.Input
              name="name"
              control={control}
              placeholder="Nome"
            />
          </InputGroup.InputContent>
          {errors.name?.message && (
            <InputGroup.InputErrorMessage
              error={errors.name.message}
              className="ml-2 mt-1"
            />
          )}

          <InputGroup.InputContent>
            <InputGroup.Input
              name="price"
              control={control}
              keyboardType="decimal-pad"
              placeholder="Preço"
            />
          </InputGroup.InputContent>
          {errors.price?.message && (
            <InputGroup.InputErrorMessage
              error={errors.price.message}
              className="ml-2 mt-1"
            />
          )}
        </InputGroup.InputRoot>
        <View className="h-full">
          <Button label="Cadastrar" onPress={handleSubmit} />
        </View>
      </View>
    </View>
  )
}
