import { Text, TouchableOpacity, View } from 'react-native'

import { useUser } from '@/contexts/userContext'

import { Feather } from '@expo/vector-icons'

import { Card } from '@/components/Card'
import { HeaderAppScreen } from '@/components/HeaderAppScreen'
import { ProfileAvatar } from '@/components/ProfileAvatar'

import { colors } from '@/styles/colors'
import { TransactionInfo } from '@/components/TransactionInfo'
import { LineDivider } from '@/components/LineDivider'

export const Home = () => {
  const { userInfoDb } = useUser()
  console.log(userInfoDb)

  return (
    <View className="flex-1">
      <HeaderAppScreen className="flex-row items-center">
        <ProfileAvatar username={userInfoDb.username} />
      </HeaderAppScreen>
      <Card />
      <View className="px-4">
        <View className="mt-10 flex-row justify-between">
          <Text className="text-lg">Recentes</Text>
          <TouchableOpacity>
            <Feather name="arrow-right" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View className="rounded-lg bg-primary-Light mt-3 px-4">
          <TransactionInfo />
          <LineDivider />
          <TransactionInfo />
          <LineDivider />
          <TransactionInfo />
          <LineDivider />
          <TransactionInfo />
          <LineDivider />
          <TransactionInfo />
          <LineDivider />
          <TransactionInfo />
        </View>
      </View>
    </View>
  )
}
