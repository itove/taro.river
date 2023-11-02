import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell, Avatar, Row, Col, Empty, Skeleton } from "@nutui/nutui-react-taro"
import { Right } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'
import { Env } from '../../env'
import { fmtDate } from '../../fmtDate'

function goto() {
  Taro.navigateTo({url: '/pages/node/new'})
}

function Index() {
  const [nodeList, setNodeList] = useState()
  let uid: int

  const goto = (id) => {
    Taro.navigateTo({url: '/pages/node/show?id=' + id})
  }

  useEffect(() => {
  console.log(nodeList)
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
          className='cell'
          title={n.title}
          description={fmtDate(n.createdAt)}
          align='center'
          extra={<><span>{n.type.name}</span> <Right className="ms-1" size="12" /></>}
          onClick={() => goto(n.id)}
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
    <View className="p-1">
      <View className="index">
        { nodeList && nodeList.length > 0 &&
        <Cell.Group divider class="w-100">
          {nodeList}
        </Cell.Group>
        }
        { nodeList && nodeList.length === 0 &&
        <Empty status="empty" description="无内容" imageSize={250} />
        }
        { nodeList === undefined &&
        <Skeleton animated title rows={22} />
        }
      </View>
    </View>
  )
}

export default Index
