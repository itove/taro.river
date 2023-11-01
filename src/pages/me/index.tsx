import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell, Avatar, Row, Col } from "@nutui/nutui-react-taro"
import { Right } from '@nutui/icons-react-taro'
import './index.scss'
import Taro from '@tarojs/taro'
import { Env } from '../../env'

// const attrs = {
//   name: 'jess',
//   phone: '1329191',
//   phone1: 'df29191'
// }

function goto() {
  const link = '/pages/node/index'
  Taro.navigateTo({ url: link })
}

function Index() {
  // const [list, setList] = useState([])
  const [user, setUser] = useState({})
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
        setUser(res.data)
      })
    })

  }, [])

  return (
    <View className="">
      <Row className="p-1 align-item-center">
        <Col span="">
          <Avatar
            size="50"
            src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
          />
        </Col>
        <Col span="" className="ps-1">
            <div className="ellipsis flex-content flex-content-light">{user.username}</div>
            <div className="ellipsis flex-content flex-content-light">{user.name}</div>
        </Col> 
      </Row>
      <Cell.Group>
        <Cell
        className='nutui-cell--clickable'
        title='个人信息'
        align='center'
        extra={<Right size="12" />}
        onClick={goto}
        />
        <Cell
        className='nutui-cell--clickable'
        title='我的收藏'
        align='center'
        extra={<Right size="12" />}
        />
        <Cell
        className='nutui-cell--clickable'
        title='设置'
        align='center'
        extra={<Right size="12" />}
        />
      </Cell.Group>
    </View>
  )
}

export default Index
