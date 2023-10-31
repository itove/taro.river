import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button } from "@nutui/nutui-react-taro"
import Taro from '@tarojs/taro'
import './index.scss'
import { Env } from '../../env'

function goto() {
  Taro.navigateTo({url: '/pages/node/new'})
}

function Index() {
  let uid: int

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      console.log('logged in')
      uid = res.data.id

      // fetch my nodes
      Taro.request({
        url: Env.apiUrl + 'nodes?lawyer=' + uid
      })
      .then(res => {
        console.log(res)
      })
    })
    .catch(err => {
      console.log(err)
      Taro.redirectTo({url: '/pages/me/login'})
    })
  })

  return (
    <View className="nutui-react-demo">
      <View className="index">
      </View>
      <View className="index">
      </View>
    </View>
  )
}

export default Index
