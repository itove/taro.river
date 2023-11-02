import React, { useState, useEffect } from 'react'
import { View, Image } from '@tarojs/components'
import { Button, Cell, Avatar, Row, Col } from "@nutui/nutui-react-taro"
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
          <Image className="w-100" src={Env.filesUrl + 'others/' + o.image} mode="widthFix" preview="true" />
        </View>
      )
      setOthersList(l)
    })
  }, [])

  const edit = () => {
    console.log('go edit')
  }

  return (
    <View className="px-1 article pb-3">
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
      <View className="h3"> 申请书图片 </View>
      <Image className="w-100" src={Env.filesUrl + 'node/' + node.application} mode="widthFix" preview="true" />

      {othersList}

      <View className="p-1 fixed">
        <Button className="btn" block onClick={edit}>编辑</Button>
      </View>
    </View>
  )
}

export default Index
