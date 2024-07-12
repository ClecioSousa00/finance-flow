import { HeaderAppScreen } from '@/components/HeaderAppScreen'

import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { UseRegister } from './useRegister'
import { InputGroup } from '@/components/Input'
import { Button } from '@/components/Button/Button'
import { DropDownCategories } from '@/components/DropDownCategories'

export const Register = () => {
  const {
    control,
    errors,
    handleSubmit,
    handleSelectOptionTransaction,
    optionTransaction,
    // errorOption,
  } = UseRegister()

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1">
        <HeaderAppScreen>
          <View className="justify-center items-center h-full">
            <Text className="text-2xl">Cadastro</Text>
          </View>
        </HeaderAppScreen>

        <View className="px-4 mt-5">
          <InputGroup.InputRoot className="gap-6">
            <View>
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
            </View>

            <View>
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
            </View>
            <DropDownCategories
              handleSelectOptionTransaction={handleSelectOptionTransaction}
              optionTransaction={optionTransaction}
              // errorOption={errorOption}
            />
          </InputGroup.InputRoot>
        </View>
        <View className="flex-1 justify-end pb-24  px-4">
          <Button label="Cadastrar" onPress={handleSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
