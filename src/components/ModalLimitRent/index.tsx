import { View } from 'react-native'
import { InputGroup } from '../Input'
import { ModalGroup } from '../Modal'
import { Button } from '../Button/Button'
import { formattedValueInput } from '@/utils/priceFormat'

type Props = {
  modalIsOpen: boolean
  limitBalance: string
  handlePriceChange: (event: string) => void
  handleSaveLimit: () => void
  handleModal: () => void
}

export const ModalLimitRent = ({
  handleModal,
  handlePriceChange,
  handleSaveLimit,
  limitBalance,
  modalIsOpen,
}: Props) => {
  return (
    <View className="flex-1 absolute">
      <ModalGroup.ModalRoot isOpen={modalIsOpen}>
        <ModalGroup.ModalKeyboard>
          <ModalGroup.ModalContent>
            <ModalGroup.ModalTitle title="limite suas despesas" />
            <InputGroup.InputContent className="mt-6">
              <InputGroup.InputControlled
                placeholder="limite..."
                keyboardAppearance="light"
                keyboardType="decimal-pad"
                value={formattedValueInput(limitBalance.replace(/\D/g, ''))}
                onChangeText={handlePriceChange}
              />
            </InputGroup.InputContent>
            <View className="flex-1 justify-end items-center gap-3 w-full">
              <Button
                label="Salvar"
                className="w-full"
                onPress={() => handleSaveLimit()}
              />
              <Button
                label="Cancelar"
                className="w-full"
                variant={'danger'}
                onPress={() => handleModal()}
              />
            </View>
          </ModalGroup.ModalContent>
        </ModalGroup.ModalKeyboard>
      </ModalGroup.ModalRoot>
    </View>
  )
}
