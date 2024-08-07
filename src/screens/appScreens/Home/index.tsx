import React from 'react'

import { View } from 'react-native'

import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { TransactionInfo } from '@/components/TransactionInfo'

import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'
import { DateOptions } from '@/components/DateOptions'
import { Container } from '@/components/Container'
import { ModalGroup } from '@/components/Modal'
import { InputGroup } from '@/components/Input'
import { Button } from '@/components/Button/Button'

import { formattedValueInput } from '@/utils/priceFormat'

import { UseHome } from './useHome'

export const Home = () => {
  const {
    handleModal,
    handleOptionDate,
    handlePriceChange,
    handleSaveLimit,
    limitBalance,
    modalIsOpen,
    optionDateSelected,
    percentageLimit,
    totalBalanceTransactions,
    dateOptions,
    transactionListDate,
  } = UseHome()
  console.log('renderizou')

  return (
    <View className="flex-1 bg-secondary">
      <HeaderAppScreen>
        <ContainerBalanceInfos
          totalBalanceTransactions={totalBalanceTransactions}
          handleModal={handleModal}
          percentageLimit={percentageLimit}
          limitBalance={limitBalance}
        />
      </HeaderAppScreen>
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
      <Container>
        <DateOptions
          dateOptions={dateOptions}
          handleOptionDate={handleOptionDate}
          optionDateSelected={optionDateSelected}
        />
        <View className="mt-6 gap-6">
          {transactionListDate.map((item, index) => (
            <TransactionInfo transaction={item} key={index} />
          ))}
        </View>
      </Container>
    </View>
  )
}
