import { View } from 'react-native'

import { ModalGroup } from '../Modal'
import { Button } from '../Button/Button'

type Props = {
  modalIsOpen: boolean
  titleModal: string
  subTitleModal: string

  handleConfirmModal: () => void
  handleCloseModal: () => void
}

export const ModalMessage = ({
  handleCloseModal,
  handleConfirmModal,
  modalIsOpen,
  subTitleModal,
  titleModal,
}: Props) => {
  return (
    <ModalGroup.ModalRoot isOpen={modalIsOpen}>
      <ModalGroup.ModalKeyboard>
        <ModalGroup.ModalContent>
          <ModalGroup.ModalTitle title={titleModal} />
          <ModalGroup.Modalsubtitle message={subTitleModal} />
          <View className="flex-1 justify-end items-center gap-3 w-full">
            <Button
              label="confirmar"
              className="w-full"
              onPress={() => handleConfirmModal()}
            />
            <Button
              label="cancelar"
              className="w-full"
              variant={'danger'}
              onPress={() => handleCloseModal()}
            />
          </View>
        </ModalGroup.ModalContent>
      </ModalGroup.ModalKeyboard>
    </ModalGroup.ModalRoot>
  )
}
