import { Transaction } from '@/types/transactionProps'
import { User } from 'firebase/auth'
import { TransactionAccess } from '../dataAccess/transactionAccess'
import Toast from 'react-native-toast-message'

type TransactionMessage = {
  response: 'success' | 'error'
}

const UpdateTransactionAction = async (
  user: User,
  data: Transaction,
): Promise<TransactionMessage> => {
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

const SetUserTransactionAction = async (
  data: Transaction,
  user: User,
): Promise<TransactionMessage> => {
  try {
    await TransactionAccess.addTransactionAccess(data, user)
    Toast.show({
      type: 'success',
      text1: 'Adicionado com sucesso.',
    })
    console.log('Transação adicionada com sucesso!')
    return { response: 'success' }
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Erro ao fazer o cadastro, tente mais tarde.',
    })
    console.log('erro ao criar transação', error)
    return { response: 'error' }
  }
}

export const TransactionAction = {
  UpdateTransactionAction,
  SetUserTransactionAction,
}
