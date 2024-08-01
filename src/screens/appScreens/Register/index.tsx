import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { InputGroup } from '@/components/Input'
import { Button } from '@/components/Button/Button'
import { DropDownCategories } from '@/components/DropDownCategories'

import { UseRegister } from './useRegister'

import { formattedValueInput } from '@/utils/priceFormat'

export const Register = () => {
  const {
    name,
    setName,
    nameError,
    price,
    priceError,
    errorOptionTransaction,
    handlePriceChange,
    handleSelectOptionTransaction,
    onSubmit,
    optionTransaction,
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
                <InputGroup.InputControlled
                  placeholder="Nome"
                  value={name}
                  onChangeText={setName}
                />
              </InputGroup.InputContent>
              {nameError && (
                <InputGroup.InputErrorMessage
                  error={nameError}
                  className="ml-2 mt-1"
                />
              )}
            </View>

            <View>
              <InputGroup.InputContent>
                <InputGroup.InputControlled
                  placeholder="Preço"
                  keyboardType="decimal-pad"
                  value={formattedValueInput(price.replace(/\D/g, ''))}
                  onChangeText={handlePriceChange}
                />
              </InputGroup.InputContent>
              {priceError && (
                <InputGroup.InputErrorMessage
                  error={priceError}
                  className="ml-2 mt-1"
                />
              )}
            </View>
            <DropDownCategories
              handleSelectOptionTransaction={handleSelectOptionTransaction}
              optionTransaction={optionTransaction}
              errorOptionTransaction={errorOptionTransaction}
            />
          </InputGroup.InputRoot>
        </View>
        <View className="flex-1 justify-end pb-24  px-4">
          <Button label="Cadastrar" onPress={onSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
