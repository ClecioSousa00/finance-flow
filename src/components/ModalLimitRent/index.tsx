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
          <View className="flex-1 justify-center items-center gap-3 w-full">
            <Button
              label="salvar"
              className="w-2/3"
              onPress={() => handleSaveLimit()}
            />
            <Button
              label="cancelar"
              className="w-2/3"
              variant={'danger'}
              onPress={() => handleModal()}
            />
          </View>
        </ModalGroup.ModalContent>
      </ModalGroup.ModalKeyboard>
    </ModalGroup.ModalRoot>
  )
}
