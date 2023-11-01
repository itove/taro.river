import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell, Avatar, Row, Col } from "@nutui/nutui-react-taro"
import { Right } from '@nutui/icons-react-taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'

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
        if (user.phone === undefined) {
          user.phone = '填写手机号'
        }
        if (user.name === undefined) {
          user.phone = '填写姓名'
        }
        if (user.firm === undefined) {
          user.firm = {name: '选择律所'}
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

  const editName = () => {
    console.log('go')
    Taro.navigateTo({ url: "/pages/me/name" })
  }

  const logout = () => {
    console.log('out')
    Taro.showModal({
      title: '提示',
      content: '确定要退出当前账号？',
      success: function (res) {
        if (res.confirm) {
          Taro.removeStorage({
            key: Env.storageKey,
            success: res => {
              console.log('storeage removed: ' + Env.storageKey);
            },
            fail: res => {
              console.log('storeage removed failed');
            }
          })
          Taro.redirectTo({ url: '/pages/me/login'})
        } else if (res.cancel) {
        }
      }
    })
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
        onClick={editName}
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
      <Button className="btn" block onClick={logout}>退出登录</Button>
    </View>
    </View>
  )
}

export default Index
