import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button } from "@nutui/nutui-react-taro"
import Taro from '@tarojs/taro'
import './index.scss'
import { Env } from '../../env'

function Index() {
  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      console.log('logged in')
    })
    .catch(err => {
      console.log(err)
      Taro.redirectTo({url: '/pages/me/login'})
    })
  })

  return (
    <View className="nutui-react-demo">
      <View className="index">
        欢迎使用 NutUI React 开发 Taro 多端项目。
      </View>
      <View className="index">
        <Button type="primary" className="btn">
          NutUI React Button
        </Button>
      </View>
    </View>
  )
}

export default Index
