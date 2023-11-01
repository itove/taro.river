import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell, Avatar, Row, Col } from "@nutui/nutui-react-taro"
import { Right } from '@nutui/icons-react-taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'

function goto() {
  const link = '/pages/node/index'
  Taro.navigateTo({ url: link })
}

function Index() {
  const [user, setUser] = useState({firm: {name: ''}})
  let l = []
  let uid: int

  useEffect(() => {
    Taro.getStorage({
      key: Env.storageKey
    })
    .then(res => {
      uid = res.data.id

      // fetch data
      Taro.request({
        url: Env.apiUrl + 'users/' + res.data.id
      })
      .then(res => {
        console.log(res)
        let user = res.data
        if (user.firm === undefined) {
          user.firm = {name: ''}
        }
        setUser(user)
      })
    })

  }, [])

  return (
    <View className="">
      <Cell.Group>
        <Cell
        className='nutui-cell--clickable'
        title='头像'
        align='center'
        extra={<><Avatar size="22" className="me-1" src={user.avtar}/><Right size="12" /></>}
        onClick={goto}
        />
        <Cell
        className='nutui-cell--clickable'
        title='姓名'
        align='center'
        extra={<><span className="me-1">{user.name}</span><Right size="12" /></>}
        />
        <Cell
        className='nutui-cell--clickable'
        title='手机'
        align='center'
        extra={<><span className="me-1">{user.phone}</span><Right size="12" /></>}
        />
        <Cell
        className='nutui-cell--clickable'
        title='律所'
        align='center'
        extra={<><span className="me-1">{user.firm.name}</span><Right size="12" /></>}
        />
      </Cell.Group>
    <View className="p-1 fixed">
      <Button className="btn" block>退出登录</Button>
    </View>
    </View>
  )
}

export default Index
