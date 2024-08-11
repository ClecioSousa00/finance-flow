import { View, TouchableWithoutFeedback, Keyboard } from 'react-native'

import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { InputGroup } from '@/components/Input'
import { Button } from '@/components/Button/Button'
import { DropDownCategories } from '@/components/DropDownCategories'

import { HeaderNavigation } from '@/components/HeaderNavigation'
import { Container } from '@/components/Container'
import { InputLabel } from '@/components/Input/InputLabel'
import { ExpenseButton } from '@/components/ExpenseButton'

import { UseRegister } from './useRegister'

import { formattedValueInput } from '@/utils/priceFormat'

import { expenseContent } from './expenseContent'
import { TitleScreen } from '@/components/TitleScreen'

export const Register = () => {
  const {
    name,
    setName,
    nameError,
    price,
    priceError,
    errorOptionTransaction,
    handlePriceChange,
    handleSelectOptionCategory,
    onSubmit,
    optionTransaction,
    handleOptionSelect,
    optionSelected,
    errorOptionSelected,
  } = UseRegister()

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-secondary">
        <HeaderAppScreen className="h-36">
          <TitleScreen title="cadastro" />
        </HeaderAppScreen>

        <Container>
          <InputGroup.InputRoot className="gap-6">
            <View>
              <InputLabel label="categoria" />
              <DropDownCategories
                handleSelectOptionCategory={handleSelectOptionCategory}
                optionTransaction={optionTransaction}
                errorOptionTransaction={errorOptionTransaction}
              />
            </View>

            <View>
              <InputLabel label="nome da despesa" />
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
              <InputLabel label="valor" />
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
            <View>
              <View className="flex-row items-center justify-between">
                {expenseContent.map((item) => (
                  <ExpenseButton
                    infos={item}
                    key={item.name}
                    handleOptionSelect={handleOptionSelect}
                    optionSelected={optionSelected}
                  />
                ))}
              </View>
              {errorOptionSelected && (
                <InputGroup.InputErrorMessage
                  error={errorOptionSelected}
                  className="ml-2 mt-1"
                />
              )}
            </View>
          </InputGroup.InputRoot>

          <View className="flex-1 justify-end pb-24  px-4">
            <Button label="Cadastrar" onPress={onSubmit} />
          </View>
        </Container>
      </View>
    </TouchableWithoutFeedback>
  )
}
