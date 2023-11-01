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

  const onChooseAvatar = (e) => {
    console.log(e)
  }

  const onGetphonenumber = (e) => {
    console.log(e)
  }

  return (
    <View className="">
      <Cell.Group>
        <Cell
        className='nutui-cell--clickable'
        title='头像'
        align='center'
        extra={<><Button className="notbtn" icon={<Avatar size="22" src={user.avtar}/>} openType="chooseAvatar" onChooseAvatar={onChooseAvatar}></Button><Right className="ms-1" size="12" /></>}
        />
        <Cell
        className='nutui-cell--clickable'
        title='姓名'
        align='center'
        extra={<><span>{user.name}</span><Right className="ms-1" size="12" /></>}
        />
        <Cell
        className='nutui-cell--clickable'
        title='手机'
        align='center'
        extra={<><Button className="notbtn" openType="getPhoneNumber" onGetphonenumber={onGetphonenumber}>{user.phone}</Button><Right className="ms-1" size="12" /></>}
        />
        <Cell
        className='nutui-cell--clickable'
        title='律所'
        align='center'
        extra={<><span>{user.firm.name}</span><Right className="ms-1" size="12" /></>}
        />
      </Cell.Group>
    <View className="p-1 fixed">
      <Button className="btn" block>退出登录</Button>
    </View>
    </View>
  )
}

export default Index
