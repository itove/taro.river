import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell } from "@nutui/nutui-react-taro"
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

      // for (let i in attrs) {
      // const extra= <><span>{attrs[i]}</span><Right /></>
      // l.push(
      //     <Cell
      //     className='nutui-cell--clickable'
      //     title={i}
      //     align='center'
      //     extra={extra}
      //     onClick={goto}
      //     />
      //     )
      // }
      // console.log(l)
      // setList(l)
    })

  }, [])

  return (
    <View className="nutui-react-demo">
      <Cell.Group>
        <Cell
        className='nutui-cell--clickable'
        title='姓名'
        align='center'
        extra={user.name}
        onClick={goto}
        />
        <Cell
        className='nutui-cell--clickable'
        title='电话'
        align='center'
        extra={user.phone}
        onClick={goto}
        />
      </Cell.Group>
    </View>
  )
}

export default Index
