import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { ProfileAvatar } from '../ProfileAvatar'
import { View } from 'react-native'

export const CustomDrawerContent = (
  drawerProps: DrawerContentComponentProps,
) => {
  console.log(drawerProps.descriptors)

  return (
    <DrawerContentScrollView className="pt-3 px-1" {...drawerProps}>
      <View>
        <ProfileAvatar />
        <View className="h-[1px] mt-2 bg-primary-Light" />
      </View>
      <DrawerItemList {...drawerProps} />
    </DrawerContentScrollView>
  )
}
