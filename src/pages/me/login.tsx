import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button } from "@nutui/nutui-react-taro"
import Taro from '@tarojs/taro'
import './index.scss'
import { Env } from '../../env'

function wxlogin() {
  Taro.login({
    success: function (res) {
      if (res.code) {
        let data = {
          code: res.code
        }
        Taro.request({
          method: 'POST',
          url: Env.apiUrl + 'wxlogin',
          data
        }).then((res) => {
          if (res.statusCode === 200) {
            Taro.setStorage({
              key: Env.storageKey,
              data: res.data
            });
            Taro.reLaunch({ url: '/pages/me/index' })
          } else {
            Taro.showToast({
              title: '系统错误',
              icon: 'error',
              duration: 2000
            })
            console.log('server error！' + res.errMsg)
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

function Index() {
  return (
    <View className="nutui-react-demo">
      <View className="index">
        <Button type="success" className="btn" onClick={wxlogin}>
          微信登录
        </Button>
      </View>
    </View>
  )
}

export default Index
