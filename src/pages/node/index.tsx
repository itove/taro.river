import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell, Avatar, Row, Col } from "@nutui/nutui-react-taro"
import { Right } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'
import { Env } from '../../env'

function goto() {
  Taro.navigateTo({url: '/pages/node/new'})
}

function Index() {
  const [nodeList, setNodeList] = useState([])
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
        const l = res.data.map(n => 
          <Cell
          className='nutui-cell--clickable'
          title={n.title}
          description={n.createdAt}
          align='center'
          extra={<><span>{n.type.name}</span> <Right className="ms-1" size="12" /></>}
          />
        )
        console.log(l)
        setNodeList(l)
      })
    })
    .catch(err => {
      console.log(err)
      Taro.redirectTo({url: '/pages/me/login'})
    })
  }, [])

  return (
    <View className="">
      <View className="index">
        <Cell.Group divider class="w-100">
          {nodeList}
        </Cell.Group>
      </View>
    </View>
  )
}

export default Index
