import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button } from "@nutui/nutui-react-taro"
import Taro from '@tarojs/taro'
import './index.scss'
import { Env } from '../../env'


function Index() {
  const [disabled, setDisabled] = useState(false)

  const wxlogin = () => {
    setDisabled(true)
    Taro.showLoading({
      title: '加载中',
    })
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
              setDisabled(false)
              console.log('server error！' + res.errMsg)
            }
            // Taro.hideLoading()
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }

  return (
    <View className="nutui-react-demo">
      <View className="index pt-12">
        <Button type="success" className="btn" disabled={disabled} onClick={wxlogin}>
          微信登录
        </Button>
      </View>
    </View>
  )
}

export default Index
