import { Modal, ModalProps } from 'react-native'

type Props = {
  isOpen: boolean
} & ModalProps

export const ModalRoot = ({ isOpen, children, ...rest }: Props) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      {children}
    </Modal>
  )
}
