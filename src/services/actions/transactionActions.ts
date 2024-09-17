import { Transaction } from '@/types/transactionProps'
import { User } from 'firebase/auth'
import { TransactionAccess } from '../dataAccess/transactionAccess'
import Toast from 'react-native-toast-message'

type UpdateTransactionMessage = {
  response: 'success' | 'error'
}

const UpdateTransactionAction = async (
  user: User,
  data: Transaction,
): Promise<UpdateTransactionMessage> => {
  try {
    await TransactionAccess.updateTransactionAccess(user, data)
    console.log(data)

    Toast.show({
      type: 'success',
      text1: 'Editado com sucesso.',
    })
    return { response: 'success' }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro ao atualizar a transação, tente mais tarde.',
    })
    return { response: 'error' }
  }
}

export const TransactionAction = {
  UpdateTransactionAction,
}
