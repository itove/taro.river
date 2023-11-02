import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import { Button, Cell, Avatar, Row, Col, Image } from "@nutui/nutui-react-taro"
import { Right } from '@nutui/icons-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'
import { Env } from '../../env'
import { fmtDate } from '../../fmtDate'

function Index() {
  const [node, setNode] = useState({type: ''})
  const [othersList, setOthersList] = useState([])

  useEffect(() => {
    Taro.request({
      url: Env.apiUrl + 'nodes/' + 1
    })
    .then(res => {
      console.log(res)
      setNode(res.data)

      const l = res.data.others.map(o => 
        <View>
          <View className="h3">{o.name}</View>
          <Image src={Env.filesUrl + 'others/' + o.image} width="100%" height="unset" />
        </View>
      )
      setOthersList(l)
    })
  }, [])

  const edit = () => {
    console.log('go edit')
  }

  return (
    <View className="px-1 article">
      <View className="title">{node.title}</View>
      <View className="meta">
        <Row type="flex" justify="space-between">
            <Col span="12">
                <div className="flex-content">{node.type.name}</div>
            </Col>
            <Col span="12">
                <div className="flex-content text-align-right">{fmtDate(node.createdAt)}</div>
            </Col>
        </Row>
      </View>
      <View dangerouslySetInnerHTML={{__html: node.body}} className='body'></View>
      <View class="h3"> 申请书图片 </View>
      <Image src={Env.filesUrl + 'node/' + node.application} width="100%" height="unset" />

      {othersList}

      <View className="p-1 fixed">
        <Button className="btn" block onClick={edit}>编辑</Button>
      </View>
    </View>
  )
}

export default Index
