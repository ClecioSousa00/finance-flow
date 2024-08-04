import { Text, TouchableOpacity, View } from 'react-native'

import { useUser } from '@/contexts/userContext'

import { Feather } from '@expo/vector-icons'

import { Card } from '@/components/Card'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { ProfileAvatar } from '@/components/ProfileAvatar'

import { colors } from '@/styles/colors'
import { TransactionInfo } from '@/components/TransactionInfo'
import { LineDivider } from '@/components/LineDivider'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { UserAccess } from '@/services/dataAccess/usersAccess'
import { Transaction } from '@/services/dataBaseTypes'
import { formatDate } from '@/utils/dataFormat'
import { formatPrice } from '@/utils/priceFormat'
import { BalanceInfos } from '@/components/BalanceInfos'
import { ContainerBalanceInfos } from '@/components/ContainerBalanceInfos'

export const Home = () => {
  const { user, userInfoDb } = useUser()
  const [dataTransactions, setDataTransactions] = useState<Transaction[]>([])
  const { month, year } = formatDate()
  const quantityRecent = 5
  console.log(userInfoDb)

  const getTransaction = useCallback(async () => {
    if (!user) return

    try {
      const dataTransactions = await UserAccess.getTransaction(
        user,
        year,
        month,
      )
      console.log(dataTransactions)

      const transactionsList: Transaction[] = dataTransactions.docs.map(
        (doc) => {
          const data = doc.data() as Transaction
          return {
            name: data.name,
            price: data.price,
            categoria: data.categoria,
            fullDate: data.fullDate,
            year: data.year,
            month: data.month,
          }
        },
      )

      console.log('=================')
      console.log(transactionsList)
      console.log('=================')

      setDataTransactions(transactionsList)
      console.log('get de transações')
    } catch (error) {
      console.log('Erro ao pegar as transações', error)
    }
  }, [user, month, year])

  const totalResume = () => {
    const total = dataTransactions.reduce((acc, item) => {
      return (acc += Number(item.price.replace(/\D/g, '')))
    }, 0)
    return formatPrice(String(total))
  }

  console.log(dataTransactions)

  useLayoutEffect(() => {
    getTransaction()
  }, [getTransaction])

  return (
    <View className="flex-1 bg-secondary">
      <HeaderAppScreen>
        {/* <ProfileAvatar username={userInfoDb.username} /> */}
        <ContainerBalanceInfos />
      </HeaderAppScreen>
      {/* <Card total={totalResume()} /> */}
      <View className="px-4 bg-primary flex-1 rounded-t-[60px]">
        <View className="mt-10 flex-row justify-between">
          <Text className="text-lg text-white">Recentes</Text>
          <TouchableOpacity>
            <Feather name="arrow-right" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View className="rounded-lg bg-primary-Light mt-3 px-4">
          {dataTransactions.map((item, index) => (
            <React.Fragment key={index}>
              {index <= quantityRecent && (
                <>
                  <TransactionInfo transaction={item} />
                  {index !== dataTransactions.length - 1 && <LineDivider />}
                </>
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    </View>
  )
}
