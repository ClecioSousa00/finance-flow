import { Transaction } from '@/types/transactionProps'
import { User } from 'firebase/auth'
import { TransactionAccess } from '../dataAccess/transactionAccess'
import Toast from 'react-native-toast-message'

const updateTransactionAction = async (user: User, data: Transaction) => {
  try {
    await TransactionAccess.updateTransactionAccess(user, data)
    console.log(data)

    Toast.show({
      type: 'success',
      text1: 'Editado com sucesso.',
    })
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro ao atualizar a transação, tente mais tarde.',
    })
  }
}

export const TransactionAction = {
  updateTransactionAction,
}
